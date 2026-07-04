/**
 * Anlamı olmayan İngilizce kelimeleri Excel'e aktarır.
 * Aynı zamanda kaynak istatistiklerini gösterir.
 * node scripts/export-no-meaning.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');
const path = require('path');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function main() {
  console.log('Supabase\'den veriler çekiliyor...');

  const noMeaning = [];
  let withMeaning = 0;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('word_meanings')
      .select('word, meanings')
      .like('word', 'en:%')
      .range(from, from + 999);

    if (error) { console.error('Hata:', error.message); break; }
    if (!data || data.length === 0) break;

    for (const r of data) {
      const word = r.word.replace(/^en:/, '');
      if (!r.meanings || r.meanings.length === 0) {
        noMeaning.push(word);
      } else {
        withMeaning++;
      }
    }

    from += 1000;
    process.stdout.write(`\r  Taranan: ${from}`);
    if (data.length < 1000) break;
  }

  noMeaning.sort((a, b) => a.localeCompare(b, 'en'));
  const total = noMeaning.length + withMeaning;

  console.log('\n\n─────────────────────────────────────────');
  console.log(`Toplam EN kelime        : ${total}`);
  console.log(`Anlamı olan             : ${withMeaning} (%${((withMeaning/total)*100).toFixed(1)})`);
  console.log(`Anlamı olmayan          : ${noMeaning.length} (%${((noMeaning.length/total)*100).toFixed(1)})`);
  console.log('─────────────────────────────────────────\n');

  // Excel dosyası oluştur
  const wb = XLSX.utils.book_new();
  const wsData = [['Kelime']].concat(noMeaning.map(w => [w]));
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Kolon genişliği
  ws['!cols'] = [{ wch: 20 }];

  XLSX.utils.book_append_sheet(wb, ws, 'Anlamsız Kelimeler');

  const outPath = path.join(__dirname, '../anlamı bulunamayan ingilizce kelimeler.xlsx');
  XLSX.writeFile(wb, outPath);
  console.log(`Excel kaydedildi: ${outPath}`);
  console.log(`Toplam ${noMeaning.length} satır`);
}

main().catch(console.error);
