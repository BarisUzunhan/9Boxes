/**
 * dictionaryapi.dev'de bulunamayan kelimeleri Wiktionary'den çeker.
 * node scripts/refill-en-wiktionary.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const https   = require('https');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const CONCURRENCY  = 10;
const BATCH_MS     = 1000;
const UPSERT_EVERY = 50;

function stripHtml(str) {
  return (str || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function fetchWiktionary(word) {
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'en.wiktionary.org',
      path: `/api/rest_v1/page/definition/${encodeURIComponent(word)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Verbum9/1.0 (word-game; contact: b_uzunhan@hotmail.com)',
        'Accept': 'application/json',
      },
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode !== 200) return resolve([]);
        try {
          const json = JSON.parse(data);
          const enEntries = json['en'] || [];
          const meanings = [];
          for (const entry of enEntries) {
            if (entry.language !== 'English') continue;
            const pos = entry.partOfSpeech || '';
            for (const def of (entry.definitions || []).slice(0, 2)) {
              const text = stripHtml(def.definition);
              if (text && text.length > 2) {
                meanings.push(pos ? `(${pos}) ${text}` : text);
              }
              if (meanings.length >= 5) break;
            }
            if (meanings.length >= 5) break;
          }
          resolve(meanings);
        } catch { resolve([]); }
      });
    });
    req.on('error', () => resolve([]));
    req.setTimeout(10000, () => { req.destroy(); resolve([]); });
    req.end();
  });
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getEmptyWords() {
  process.stdout.write('Boş kelimeler taranıyor...');
  const empty = [];
  let from = 0;
  while (true) {
    const { data } = await supabase.from('word_meanings').select('word,meanings').like('word','en:%').range(from, from+999);
    if (!data || data.length === 0) break;
    for (const r of data) if (!r.meanings || r.meanings.length === 0) empty.push(r.word);
    from += 1000;
    process.stdout.write(`\rBoş kelimeler taranıyor... ${from} / ~91000`);
    if (data.length < 1000) break;
  }
  console.log(`\nBoş: ${empty.length}\n`);
  return empty;
}

async function main() {
  const emptyWords = await getEmptyWords();
  if (emptyWords.length === 0) { console.log('Tüm kelimeler dolu!'); return; }

  const estMin = Math.round(emptyWords.length / CONCURRENCY / (1000 / BATCH_MS) / 60);
  console.log(`${emptyWords.length} kelime Wiktionary'den çekilecek (~${estMin} dk)\n`);

  let filled = 0, notFound = 0, processed = 0;
  const start = Date.now();
  let upsertBuf = [];

  for (let i = 0; i < emptyWords.length; i += CONCURRENCY) {
    const chunk = emptyWords.slice(i, i + CONCURRENCY);
    const rawWords = chunk.map(w => w.replace(/^en:/, ''));
    const results = await Promise.all(rawWords.map(fetchWiktionary));

    for (let j = 0; j < chunk.length; j++) {
      upsertBuf.push({ word: chunk[j], meanings: results[j] });
      if (results[j].length > 0) filled++;
      else notFound++;
    }
    processed += chunk.length;

    if (upsertBuf.length >= UPSERT_EVERY || i + CONCURRENCY >= emptyWords.length) {
      const { error } = await supabase.from('word_meanings').upsert(upsertBuf, { onConflict: 'word' });
      if (error) console.error('\nSupabase hatası:', error.message);
      upsertBuf = [];
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    const rate    = (processed / ((Date.now() - start) / 1000)).toFixed(1);
    const rem     = rate > 0 ? Math.round((emptyWords.length - processed) / rate) : '?';
    const pct     = ((processed / emptyWords.length) * 100).toFixed(1);
    process.stdout.write(`\r[${elapsed}s] ${processed}/${emptyWords.length} (${pct}%) | dolu:${filled} yok:${notFound} | kalan ~${rem}s   `);

    await delay(BATCH_MS);
  }

  const totalMin = ((Date.now() - start) / 60000).toFixed(1);
  console.log(`\n\nBitti! ${filled} Wiktionary'den bulundu, ${notFound} hiçbir yerde yok. Süre: ${totalMin} dk`);
}

main().catch(console.error);
