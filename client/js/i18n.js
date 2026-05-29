const TRANSLATIONS = {
  tr: {
    // Auth
    'auth.username': 'Kullanıcı Adı',
    'auth.password': 'Şifre',
    'auth.email': 'E-posta',
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.forgot': 'Şifremi Unuttum?',
    'auth.to_register': 'Kayıt Ol →',
    'auth.to_login': '← Giriş',
    'auth.send_reset': 'Sıfırlama Bağlantısı Gönder',
    'auth.placeholder.username': 'kullanıcı adın',
    'auth.placeholder.username_min': 'en az 3 karakter',
    'auth.placeholder.email': 'ornek@mail.com',
    'auth.placeholder.password': 'en az 6 karakter',

    // Lobby
    'lobby.tagline': 'Türkçe Kelime Yarışı',
    'lobby.solo.title': 'Tek Oyunculu',
    'lobby.solo.desc': 'Harfleri seç, kelimeleri bul',
    'lobby.1v1.title': '1v1 Online',
    'lobby.1v1.desc': 'Rakiple gerçek zamanlı yar',
    'lobby.daily.title': 'Günlük Oyun',
    'lobby.daily.desc': 'Herkesle aynı harfler',
    'lobby.multi.title': 'Çoklu Mod',
    'lobby.multi.desc': '3-8 oyuncu, aynı harfler',
    'lobby.stat.level': 'Seviye',
    'lobby.stat.score': 'Puan',

    // Waiting
    'waiting.searching': 'Rakip aranıyor...',
    'waiting.queued': 'Sırada bekleniyor...',
    'waiting.cancel': 'Vazgeç',

    // Fill
    'fill.title': 'Harfleri Seç',
    'fill.hint': 'Klavyeyle yaz veya hücreye tıkla.',
    'fill.random_one': '🎲 Bu Hücreyi',
    'fill.random_all': '🎲 Tümünü',
    'fill.start': 'Başla →',
    'fill.my_turn': '⬤ Senin sıran — bir hücre seç ve harf gir',
    'fill.opponent_turn': '⬤ {name} seçiyor...',

    // Game
    'game.score_label': 'PUAN',
    'game.words_label': 'KELİME',
    'game.ready': 'Hazır ol!',
    'game.my_words': '📝 Kelimelerim',
    'game.my_words_panel': 'Kelimelerim',

    // Word feedback
    'word.valid': '✓ {word} (+{pts})',
    'word.invalid': '✗ {word} — sözlükte yok',
    'word.duplicate': '{word} zaten yazıldı',
    'word.short': 'En az {min} harf gerekli',
    'word.hint_label': '💡 {len} harfli bir kelime',

    // Result
    'result.title': 'Oyun Bitti!',
    'result.score_label': 'puan',
    'result.found': 'Bulduğun Kelimeler',
    'result.missed': 'Kaçırdığın Kelimeler',
    'result.all_found': 'Tüm kelimeler bulundu!',
    'result.play_again': 'Tekrar Oyna',
    'result.main_menu': 'Ana Menü',
    'result.win': 'Kazandın! {my} — {op}',
    'result.lose': 'Kaybettin. {my} — {op}',
    'result.draw': 'Berabere! {my} — {op}',
    'result.opp_disconnected': '{name} bağlantıyı kesti — sen kazandın!',

    // Settings
    'settings.title': 'Ayarlar',
    'settings.theme': 'Görünüm',
    'settings.theme_dark': 'Koyu',
    'settings.theme_light': 'Açık',
    'settings.color': 'Renk',
    'settings.sound': 'Uyarı Sesi',
    'settings.duration': 'Oyun Süresi',
    'settings.lang': 'Dil / Language',
    'settings.help': 'Yardım',
    'settings.tutorial': 'Tutorial Göster',

    // Popups
    'exit.confirm': 'Çıkmak istediğinizden emin misiniz?',
    'exit.yes': 'Çık',
    'exit.no': 'Devam Et',
    'vowel.ok': 'Tamam',
    'extension.request': 'Rakibiniz oyunu 30 saniye uzatmak istiyor.',
    'extension.accept': 'Kabul Et',
    'extension.reject': 'Reddet',

    // Toasts
    'toast.no_hint': 'Başka kelime bulunamadı!',
    'toast.opp_disconnected': '{name} bağlantısı kesildi. Oynamaya devam et — süre bitince sonuç açıklanır.',
    'toast.opp_reconnected': '{name} geri döndü!',
    'toast.no_meaning': 'Tanım bulunamadı.',
    'toast.meaning_error': 'Anlam yüklenemedi.',
    'toast.loading': 'Yükleniyor...',

    // Multi
    'multi.you': 'Sen',
    'multi.opponent': 'Rakip',
    'multi.join': 'Katıl',
    'multi.players': 'oyuncu',
    'multi.waiting_approval': 'Oda sahibinin onayı bekleniyor...',

    // Daily
    'daily.back': '← Lobi',
    'daily.title': 'Günlük Oyun',
    'daily.start': 'Oynamaya Başla',
    'daily.rank.label': 'Şu anki sıran',
    'daily.rank.note': 'Gün sonunda kesinleşir ve KL ödülün verilir',

    // Lang confirm
    'lang.confirm.title': 'Dil Ayarı',
    'lang.confirm.desc': 'Dilediğin zaman dili değiştirebilirsin.',
    'lang.confirm.current': 'Şu an {name} ile devam ediyoruz.',
    'lang.confirm.ok': 'Onayla',
    'lang.confirm.change': 'Dil Seç',
    'lang.name.tr': 'Türkçe',
    'lang.name.en': 'English',
  },

  en: {
    // Auth
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'E-mail',
    'auth.login': 'Log In',
    'auth.register': 'Sign Up',
    'auth.forgot': 'Forgot Password?',
    'auth.to_register': 'Sign Up →',
    'auth.to_login': '← Log In',
    'auth.send_reset': 'Send Reset Link',
    'auth.placeholder.username': 'your username',
    'auth.placeholder.username_min': 'at least 3 chars',
    'auth.placeholder.email': 'example@mail.com',
    'auth.placeholder.password': 'at least 6 chars',

    // Lobby
    'lobby.tagline': 'Word Game',
    'lobby.solo.title': 'Single Player',
    'lobby.solo.desc': 'Pick letters, find words',
    'lobby.1v1.title': '1v1 Online',
    'lobby.1v1.desc': 'Race against an opponent',
    'lobby.daily.title': 'Daily Puzzle',
    'lobby.daily.desc': 'Same letters for everyone',
    'lobby.multi.title': 'Multi Mode',
    'lobby.multi.desc': '3-8 players, same letters',
    'lobby.stat.level': 'Level',
    'lobby.stat.score': 'Score',

    // Waiting
    'waiting.searching': 'Finding opponent...',
    'waiting.queued': 'In queue...',
    'waiting.cancel': 'Cancel',

    // Fill
    'fill.title': 'Choose Letters',
    'fill.hint': 'Type on keyboard or tap a cell.',
    'fill.random_one': '🎲 This Cell',
    'fill.random_all': '🎲 All',
    'fill.start': 'Start →',
    'fill.my_turn': '⬤ Your turn — pick a cell and type a letter',
    'fill.opponent_turn': '⬤ {name} is choosing...',

    // Game
    'game.score_label': 'SCORE',
    'game.words_label': 'WORDS',
    'game.ready': 'Get ready!',
    'game.my_words': '📝 My Words',
    'game.my_words_panel': 'My Words',

    // Word feedback
    'word.valid': '✓ {word} (+{pts})',
    'word.invalid': '✗ {word} — not in dictionary',
    'word.duplicate': '{word} already submitted',
    'word.short': 'At least {min} letters needed',
    'word.hint_label': '💡 {len}-letter word',

    // Result
    'result.title': 'Game Over!',
    'result.score_label': 'points',
    'result.found': 'Words Found',
    'result.missed': 'Missed Words',
    'result.all_found': 'All words found!',
    'result.play_again': 'Play Again',
    'result.main_menu': 'Main Menu',
    'result.win': 'You won! {my} — {op}',
    'result.lose': 'You lost. {my} — {op}',
    'result.draw': 'Draw! {my} — {op}',
    'result.opp_disconnected': '{name} disconnected — you win!',

    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.theme_dark': 'Dark',
    'settings.theme_light': 'Light',
    'settings.color': 'Color',
    'settings.sound': 'Sound',
    'settings.duration': 'Duration',
    'settings.lang': 'Dil / Language',
    'settings.help': 'Help',
    'settings.tutorial': 'Show Tutorial',

    // Popups
    'exit.confirm': 'Are you sure you want to quit?',
    'exit.yes': 'Quit',
    'exit.no': 'Continue',
    'vowel.ok': 'OK',
    'extension.request': 'Your opponent wants to extend the game by 30 seconds.',
    'extension.accept': 'Accept',
    'extension.reject': 'Decline',

    // Toasts
    'toast.no_hint': 'No more hints available!',
    'toast.opp_disconnected': '{name} disconnected. Keep playing — result shown at time up.',
    'toast.opp_reconnected': '{name} is back!',
    'toast.no_meaning': 'No definition found.',
    'toast.meaning_error': 'Could not load meaning.',
    'toast.loading': 'Loading...',

    // Multi
    'multi.you': 'You',
    'multi.opponent': 'Opponent',
    'multi.join': 'Join',
    'multi.players': 'players',
    'multi.waiting_approval': 'Waiting for host approval...',

    // Daily
    'daily.back': '← Lobby',
    'daily.title': 'Daily Puzzle',
    'daily.start': 'Play Now',
    'daily.rank.label': 'Your current rank',
    'daily.rank.note': 'Final at day end, KL reward sent then',

    // Lang confirm
    'lang.confirm.title': 'Language Setting',
    'lang.confirm.desc': 'You can change your language at any time.',
    'lang.confirm.current': 'Currently continuing with {name}.',
    'lang.confirm.ok': 'Confirm',
    'lang.confirm.change': 'Choose Language',
    'lang.name.tr': 'Türkçe',
    'lang.name.en': 'English',
  },
};

let _lang = localStorage.getItem('verbum_lang') || 'tr';

export function setI18nLang(lang) {
  _lang = TRANSLATIONS[lang] ? lang : 'tr';
}

export function t(key, vars = {}) {
  const dict = TRANSLATIONS[_lang] || TRANSLATIONS['tr'];
  let str = dict[key] || TRANSLATIONS['tr'][key] || key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}

export function applyLang(lang) {
  setI18nLang(lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const val = t(key);
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });
}
