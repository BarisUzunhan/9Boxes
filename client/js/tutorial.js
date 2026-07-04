import { t } from './i18n.js';

// ─── Depolama anahtarları ─────────────────────────────────────
const KEYS = {
  lobby:  '9boxes_tut_lobby',
  fill:   '9boxes_tut_fill',
  game:   '9boxes_tut_game',
  result: '9boxes_tut_result',
};

// ─── Bölüm sonu callback'leri ─────────────────────────────────
const _onEndCallbacks = {};

export function onEnd(key, fn) {
  _onEndCallbacks[key] = fn;
}

// ─── Adım tanımları ───────────────────────────────────────────
// title/text i18n.js'de `tutorial.<section>.<index>.title/.text` anahtarlarıyla
// tutuluyor (showStep bunları okur) — burada sadece hedef elementin seçicisi kalıyor.
const SECTIONS = {
  lobby: [
    {},
    { sel: '#btn-profile' },
    { sel: '#btn-friends-lobby' },
    { sel: '#btn-settings-lobby' },
    { sel: '.lobby-stats-bar' },
    { sel: '#mode-solo' },
    { sel: '#mode-1v1' },
    { sel: '#mode-daily' },
    { sel: '#mode-solo' },
  ],

  fill: [
    {},
    { sel: '#fill-matrix' },
    { sel: '#btn-random-one' },
    { sel: '#btn-random-all' },
    { sel: '#btn-fill-keyboard' },
    { sel: '#btn-start-game' },
  ],

  game: [
    {},
    { sel: '#game-timer' },
    { sel: '#game-matrix' },
    { sel: '#word-display' },
    { sel: '#btn-hint' },
    { sel: '#btn-toggle-words' },
  ],

  result: [
    {},
    { sel: '#result-score-number' },
    { sel: '#result-missed-section' },
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
  const key = `tutorial.${currentKey}.${idx}`;
  $('tut-title').textContent   = t(`${key}.title`);
  $('tut-text').textContent    = t(`${key}.text`);
  $('tut-counter').textContent = `${idx + 1} / ${currentSteps.length}`;
  $('tut-prev').disabled       = idx === 0;
  $('tut-next').textContent    = idx === currentSteps.length - 1 ? t('tutorial.finish') : t('tutorial.next');

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
