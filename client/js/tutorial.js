// ─── Depolama anahtarları ─────────────────────────────────────
const KEYS = {
  lobby:  'verbum9_tut_lobby',
  fill:   'verbum9_tut_fill',
  game:   'verbum9_tut_game',
  result: 'verbum9_tut_result',
};

// ─── Bölüm sonu callback'leri ─────────────────────────────────
const _onEndCallbacks = {};

export function onEnd(key, fn) {
  _onEndCallbacks[key] = fn;
}

// ─── Adım tanımları ───────────────────────────────────────────
const SECTIONS = {
  lobby: [
    {
      title: 'Hoş Geldin!',
      text: 'Verbum9\'ya hoş geldin! Sana arayüzü kısaca tanıtalım. Hazır mısın?',
    },
    {
      sel: '#btn-profile',
      title: 'Profil Alanın',
      text: 'Kullanıcı adın, seviye ve oyun istatistiklerin burada. Profilini görüntülemek için buna bas.',
    },
    {
      sel: '#btn-friends-lobby',
      title: 'Arkadaşlar',
      text: 'Arkadaşlarını buradan yönetebilirsin. Kullanıcı ara, arkadaşlık isteği gönder — çevrimiçi arkadaşlarını oyuna davet et!',
    },
    {
      sel: '#btn-settings-lobby',
      title: 'Ayarlar',
      text: 'Tema (koyu/açık) ve ses gibi tercihlerini buradan değiştirebilirsin.',
    },
    {
      sel: '.lobby-stats-bar',
      title: 'İstatistik Çubuğun',
      text: 'Anlık seviye, toplam puan ve KL bakiyeni buradan takip edebilirsin.',
    },
    {
      sel: '#mode-solo',
      title: 'Tek Oyunculu',
      text: 'Kendi başına oyna. Harfleri kendin seç, matristeki harflerle kelimeler bul.',
    },
    {
      sel: '#mode-1v1',
      title: '1v1 Online',
      text: 'Gerçek zamanlı bir rakiple eşleş ve yarış. Ortak olmayan kelimeler puan getirir — en çok puan toplayan kazanır!',
    },
    {
      sel: '#mode-solo',
      title: 'Deneyelim!',
      text: 'Hadi bir oyun oynayalım! "Tek Oyunculu" butonuna bas — seni matris doldurma, oyun ve sonuç ekranlarında da yönlendireceğiz.',
    },
  ],

  fill: [
    {
      title: 'Harf Seçimi!',
      text: '3×3 matristeki 9 hücreyi doldurman gerekiyor. Bu harflerle kelime kuracaksın — istediğin harfleri seçebilirsin!',
    },
    {
      sel: '#fill-matrix',
      title: 'Harf Matrisi',
      text: 'Bir hücreye tıkla ve klavyeden harf gir. Sırayla tüm hücreleri doldur.',
    },
    {
      sel: '#btn-random-one',
      title: 'Rastgele Harf',
      text: 'Hangi harfi gireceğini bilmiyorsan bu butona bas — seçili hücreye rastgele bir harf atar.',
    },
    {
      sel: '#btn-random-all',
      title: 'Hepsini Doldur',
      text: 'Tüm boş hücreleri tek seferde rastgele doldurmak için buna bas.',
    },
    {
      sel: '#btn-fill-keyboard',
      title: 'Klavye Butonu',
      text: 'Telefonda kullanıyorsan ekran klavyesini açmak için buna bas.',
    },
    {
      sel: '#btn-start-game',
      title: 'Hazır mısın?',
      text: 'Harfleri seçtikten sonra "Oyunu Başlat" butonuna bas — oyun başlasın!',
    },
  ],

  game: [
    {
      title: 'Oyun Başladı!',
      text: 'Süre dolmadan matristeki harfleri kullanarak olabildiğince çok kelime bul. Uzun kelimeler daha çok puan getirir!',
    },
    {
      sel: '#game-timer',
      title: 'Süre',
      text: '2 dakikan var. Süre sıfırlandığında oyun biter ve puanlar hesaplanır.',
    },
    {
      sel: '#game-matrix',
      title: 'Harf Matrisi',
      text: 'Hücrelere sırayla tıkla ya da klavyeyle yaz. Harfleri her seferinde sıfırdan seçebilirsin.',
    },
    {
      sel: '#word-display',
      title: 'Kelime Alanı',
      text: 'Oluşturduğun kelime burada görünür. Geçerliyse Enter veya ✓ ile onayla.',
    },
    {
      sel: '#btn-hint',
      title: 'İpucu',
      text: '150 KL karşılığında ipucu alırsın — matristeki harflerden geçerli bir kelimenin bazı harflerini gösterir.',
    },
    {
      sel: '#btn-toggle-words',
      title: 'Kelimelerim',
      text: 'Bulduğun kelimeleri görmek için buna bas. Geçersiz kelimeler için buradan itiraz da edebilirsin.',
    },
  ],

  result: [
    {
      title: 'Oyun Bitti!',
      text: 'Sonuçlar hazır! Kaç puan aldığını gör ve kaçırdığın kelimeleri incele.',
    },
    {
      sel: '#result-score-number',
      title: 'Toplam Puanın',
      text: 'Bulduğun kelimelerin harf sayısı kadar puan aldın. Rakibinle ortak olmayan kelimeler sayılır.',
    },
    {
      sel: '#result-missed-section',
      title: 'Kaçırdıkların',
      text: 'Matristeki harflerle yazılabilecek ama bulamadığın kelimeler burada görünür. Bir sonraki oyunda daha iyi olacaksın!',
    },
  ],
};

// ─── Durum ────────────────────────────────────────────────────
let stepIdx = 0;
let currentSteps = [];
let currentKey = null;

function $(id) { return document.getElementById(id); }

// ─── Açık panelleri kapat ─────────────────────────────────────
function closeOpenPanels() {
  ['profile-popup', 'settings-popup', 'exit-confirm', 'vowel-popup', 'extension-popup']
    .forEach(id => { const el = document.getElementById(id); if (el) el.hidden = true; });
  const wp = document.getElementById('words-panel');
  if (wp) wp.classList.remove('open');
}

// ─── SVG Maske — hem hedef hem popup parlak ───────────────────
function buildMask(targetSel) {
  const overlay = $('tut-overlay');
  const popup   = $('tut-popup');
  if (!overlay || !popup) return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const pad = 12;
  let holes = '';

  // Hedef element deliği
  if (targetSel) {
    const t = document.querySelector(targetSel)?.getBoundingClientRect();
    if (t) {
      holes += `<rect x="${t.left - pad}" y="${t.top - pad}" `
             + `width="${t.width + pad * 2}" height="${t.height + pad * 2}" `
             + `rx="12" fill="black"/>`;
    }
  }

  // Popup deliği — popup da tam parlak görünsün
  const p = popup.getBoundingClientRect();
  if (p.width > 0) {
    holes += `<rect x="${p.left - 6}" y="${p.top - 6}" `
           + `width="${p.width + 12}" height="${p.height + 12}" `
           + `rx="16" fill="black"/>`;
  }

  const alpha = targetSel ? 0.62 : 0.35;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`
    + `<defs><mask id="m"><rect width="${W}" height="${H}" fill="white"/>${holes}</mask></defs>`
    + `<rect width="${W}" height="${H}" fill="rgba(0,0,0,${alpha})" mask="url(#m)"/>`
    + `</svg>`;

  overlay.style.background     = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  overlay.style.backgroundSize = '100% 100%';
}

// ─── Popup konumlandırma ──────────────────────────────────────
function placePopup(sel) {
  const popup = $('tut-popup');
  if (!popup) return;

  popup.style.transform  = '';
  popup.style.visibility = 'hidden';
  popup.style.display    = 'block';

  if (!sel) {
    popup.style.top       = '50%';
    popup.style.left      = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.visibility = 'visible';
    return;
  }

  const target = document.querySelector(sel);
  if (!target) return;

  const pr  = popup.getBoundingClientRect();
  const tr  = target.getBoundingClientRect();
  const gap = 16;
  const m   = 12;

  let top  = tr.bottom + gap;
  let left = tr.left + tr.width / 2 - pr.width / 2;

  left = Math.max(m, Math.min(left, window.innerWidth - pr.width - m));
  if (top + pr.height > window.innerHeight - m) top = tr.top - pr.height - gap;
  top  = Math.max(m, top);

  popup.style.top        = `${top}px`;
  popup.style.left       = `${left}px`;
  popup.style.visibility = 'visible';
}

// ─── Adım göster ─────────────────────────────────────────────
function showStep(idx) {
  const step = currentSteps[idx];
  if (!step) { end(); return; }

  closeOpenPanels();

  // Selector varsa elementin görünür ve aktif ekranda olup olmadığını kontrol et
  if (step.sel) {
    const el = document.querySelector(step.sel);
    if (!el || el.closest('.screen:not(.active)') || el.hidden) {
      showStep(idx + 1);
      return;
    }
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') {
      showStep(idx + 1);
      return;
    }
  }

  stepIdx = idx;
  $('tut-title').textContent   = step.title;
  $('tut-text').textContent    = step.text;
  $('tut-counter').textContent = `${idx + 1} / ${currentSteps.length}`;
  $('tut-prev').disabled       = idx === 0;
  $('tut-next').textContent    = idx === currentSteps.length - 1 ? 'Tamamla ✓' : 'Sonraki →';

  placePopup(step.sel);   // önce popup'ı yerleştir
  buildMask(step.sel);    // sonra maskede popup'ın da deliğini aç
}

// ─── Bölüm başlatıcılar ───────────────────────────────────────
function startSection(key) {
  currentSteps = SECTIONS[key];
  currentKey   = key;
  stepIdx      = 0;
  const overlay = $('tut-overlay');
  if (overlay) overlay.hidden = false;
  showStep(0);
}

export function end() {
  const overlay = $('tut-overlay');
  if (overlay) { overlay.hidden = true; overlay.style.background = ''; }
  if (currentKey) {
    localStorage.setItem(KEYS[currentKey], '1');
    const cb = _onEndCallbacks[currentKey];
    if (cb) cb();
  }
  currentKey = null;
}

// İlk kez göster (localStorage yoksa)
export function startLobby()  { if (!localStorage.getItem(KEYS.lobby))  startSection('lobby');  }
export function startFill()   { if (!localStorage.getItem(KEYS.fill))   startSection('fill');   }
export function startGame()   { if (!localStorage.getItem(KEYS.game))   startSection('game');   }
export function startResult() { if (!localStorage.getItem(KEYS.result)) startSection('result'); }

// Ayarlar "Tutorial Göster" — her seferinde, tüm anahtarları sıfırlar
export function showLobbyTutorial() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  startSection('lobby');
}

// ─── Event bağlama ────────────────────────────────────────────
export function init() {
  $('tut-prev').addEventListener('click', () => {
    if (stepIdx > 0) showStep(stepIdx - 1);
  });
  $('tut-next').addEventListener('click', () => {
    if (stepIdx < currentSteps.length - 1) showStep(stepIdx + 1);
    else end();
  });
  $('tut-skip').addEventListener('click', end);
}
