/**
 * Supabase'de meanings=[] olan EN kelimelerini yeniden çeker.
 * node scripts/refill-en-meanings.js
 * Güvenli hız: ~5 req/s  |  Kesintide tekrar çalıştırılabilir.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const https   = require('https');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const CONCURRENCY  = 5;
const BATCH_MS     = 1000;  // ms → ~5 req/s
const UPSERT_EVERY = 50;

function fetchDictAPI(word) {
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.dictionaryapi.dev',
      path: `/api/v2/entries/en/${encodeURIComponent(word)}`,
      method: 'GET',
      headers: { 'User-Agent': 'Verbum9/1.0' },
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode !== 200) return resolve([]);
        try {
          const json = JSON.parse(data);
          if (!Array.isArray(json)) return resolve([]);
          const meanings = json.flatMap(entry =>
            (entry.meanings || []).flatMap(m =>
              (m.definitions || []).slice(0, 2).map(d => {
                const def = d.definition || '';
                return m.partOfSpeech ? `(${m.partOfSpeech}) ${def}` : def;
              })
            )
          ).filter(Boolean).slice(0, 5);
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
  console.log('Boş anlamlı kelimeler Supabase\'den çekiliyor...');
  const empty = [];
  let from = 0;
  const PAGE = 1000;
  let total = 0;

  while (true) {
    const { data, error } = await supabase
      .from('word_meanings')
      .select('word, meanings')
      .like('word', 'en:%')
      .range(from, from + PAGE - 1);

    if (error) { console.error('Supabase hatası:', error.message); break; }
    if (!data || data.length === 0) break;

    for (const r of data) {
      if (!r.meanings || r.meanings.length === 0) empty.push(r.word);
    }
    total += data.length;
    from += PAGE;
    process.stdout.write(`\r  Taranan: ${total} | Boş: ${empty.length}`);
    if (data.length < PAGE) break;
  }
  console.log(`\nToplam taranan: ${total} | Boş bulundu: ${empty.length}\n`);
  return empty;
}

async function main() {
  const emptyWords = await getEmptyWords();

  if (emptyWords.length === 0) {
    console.log('Tüm kelimeler dolu! Yapılacak bir şey yok.');
    return;
  }

  const estMin = Math.round(emptyWords.length / CONCURRENCY / (1000 / BATCH_MS) / 60);
  console.log(`${emptyWords.length} kelime yeniden çekilecek (~${estMin} dakika)\n`);

  let filled = 0, notFound = 0, processed = 0;
  const start = Date.now();
  let upsertBuf = [];

  for (let i = 0; i < emptyWords.length; i += CONCURRENCY) {
    const chunk = emptyWords.slice(i, i + CONCURRENCY);
    const rawWords = chunk.map(w => w.replace(/^en:/, ''));

    const results = await Promise.all(rawWords.map(fetchDictAPI));

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
    const rate = (processed / ((Date.now() - start) / 1000)).toFixed(1);
    const rem = rate > 0 ? Math.round((emptyWords.length - processed) / rate) : '?';
    const pct = ((processed / emptyWords.length) * 100).toFixed(1);
    process.stdout.write(
      `\r[${elapsed}s] ${processed}/${emptyWords.length} (${pct}%) | dolu:${filled} yok:${notFound} | kalan ~${rem}s   `
    );

    await delay(BATCH_MS);
  }

  const totalMin = ((Date.now() - start) / 60000).toFixed(1);
  console.log(`\n\nBitti! ${filled} anlam bulundu, ${notFound} kelimede tanım yok. Süre: ${totalMin} dk`);
}

main().catch(console.error);
