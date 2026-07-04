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
    'fill.random_one': '🎲 Rastgele Harf',
    'fill.random_all': '🎲 Rastgele Doldur',
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
    'result.main_menu': 'Ana Sayfa',
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
    'daily.back': '← Ana Sayfa',
    'daily.title': 'Günlük Oyun',
    'daily.start': 'Oynamaya Başla',
    'daily.rank.label': 'Şu anki sıran',
    'daily.rank.note': 'Gün sonunda kesinleşir ve KL ödülün verilir',

    // Navigation
    'nav.back_main': '← Ana Sayfa',
    'nav.main_page': 'Ana Sayfa',

    // Profile popup
    'profile.level': 'Seviye',
    'profile.total_score': 'Toplam Puan',
    'profile.kl': 'KL Bakiyesi',
    'profile.games': 'Oyun',
    'profile.wins': 'Kazanılan',
    'profile.losses': 'Kaybedilen',
    'profile.logout': 'Çıkış Yap',
    'profile.joined': 'Kayıt: {date}',

    // Friends
    'friends.title': 'Arkadaşlar',
    'friends.search_ph': 'Kullanıcı adı ara...',
    'friends.search_btn': 'Ara',
    'friends.requests_title': 'Gelen İstekler',
    'friends.list_title': 'Arkadaşlar',
    'friends.empty': 'Henüz arkadaşın yok. Yukarıdan ara!',
    'friends.invite_btn': '✉ E-posta ile Davet Et',
    'friends.invite_title': 'E-posta ile Davet Et',
    'friends.invite_friend_email': 'Arkadaşının e-posta adresi',
    'friends.invite_your_name': 'Adın',
    'friends.invite_message': 'Mesaj (opsiyonel)',
    'friends.invite_message_ph': 'Arkadaşına bir şey söylemek ister misin?',
    'friends.invite_send': 'Gönder',
    'friends.invite_cancel': 'Vazgeç',
    'friends.online': '● Çevrimiçi',
    'friends.never_seen': '○ Hiç görülmedi',
    'friends.mins_ago': '{n} dk önce görüldü',
    'friends.hours_ago': '{n} saat önce görüldü',
    'friends.days_ago': '{n} gün önce görüldü',
    'friends.long_ago': '○ Uzun süredir çevrimdışı',
    'friends.just_offline': '○ Az önce çevrimdışı',
    'friends.invite_action': '⚡ Davet',
    'friends.accept': '✓ Kabul',
    'friends.reject': '✕ Reddet',
    'friends.is_friend': 'Arkadaş ✓',
    'friends.request_sent': 'İstek Gönderildi',
    'friends.add': '+ İstek Gönder',
    'friends.search_result': 'Arama Sonucu',
    'friends.not_found': 'Kullanıcı bulunamadı.',
    'friends.grp_invite_title': 'Arkadaşlarını Davet Et',
    'friends.grp_invite_desc': 'Davet sadece çevrimiçi olanlara ulaşır.',
    'friends.grp_invite_cancel': 'İptal',
    'friends.grp_invite_send': 'Davet Gönder',

    // Daily mode
    'daily.yesterday': 'Dünkü Sonucun',
    'daily.today_title': 'Bugünkü Bulmaca',
    'daily.today_desc': 'Herkes aynı harflerle oynuyor. 2 dk 30 sn içinde en çok kelimeyi bul!',
    'daily.played_today': 'Bugün oynadın!',
    'daily.your_score': 'Puan:',

    // Multi mode
    'multi.title': 'Çoklu Oyun',
    'multi.have_code': 'Oda kodun var mı?',
    'multi.code_ph': '6 haneli kod',
    'multi.or': 'veya',
    'multi.create': '+ Yeni Oyun Kur',
    'multi.open_rooms': 'Açık Odalar',
    'multi.refresh': '🔄 Yenile',
    'multi.no_open': 'Şu an herkese açık oda yok',
    'multi.host_fill_title': 'Harfleri Seç',
    'multi.host_fill_hint': '9 harf seçtikten sonra oyunu başlatabilirsin',
    'multi.room_code_lbl': 'Oda Kodu',
    'multi.dur_label': 'Süre:',
    'multi.invite_btn': '👥 Davet Et ▾',
    'multi.inv_open': '👥 İsteyen girebilsin',
    'multi.inv_code': '🔑 Kodu paylaş',
    'multi.inv_friends': '⚡ Arkadaşlarımı davet et',
    'multi.start_btn': 'Oyunu Başlat',
    'multi.players_section': 'Oyuncular',
    'multi.pending_section': 'Onay Bekliyor',
    'multi.wait_title': 'Oyun Başlamak Üzere',
    'multi.wait_host': 'Oda sahibi:',
    'multi.wait_code': 'Oda Kodu:',
    'multi.wait_players': 'Oyuncular',
    'multi.leave': 'Ayrıl',
    'multi.result_title': 'Oyun Bitti!',
    'multi.found_words': 'Bulunan Kelimeler',
    'multi.missed_words': 'Kimsenin Bulamadığı',
    'multi.exit': '← Çık',

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
    'fill.random_one': '🎲 Random Letter',
    'fill.random_all': '🎲 All Random',
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
    'result.main_menu': 'Main Page',
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
    'daily.back': '← Main Page',
    'daily.title': 'Daily Puzzle',
    'daily.start': 'Play Now',
    'daily.rank.label': 'Your current rank',
    'daily.rank.note': 'Final at day end, KL reward sent then',

    // Navigation
    'nav.back_main': '← Main Page',
    'nav.main_page': 'Main Page',

    // Profile popup
    'profile.level': 'Level',
    'profile.total_score': 'Total Score',
    'profile.kl': 'KL Balance',
    'profile.games': 'Games',
    'profile.wins': 'Wins',
    'profile.losses': 'Losses',
    'profile.logout': 'Log Out',
    'profile.joined': 'Joined: {date}',

    // Friends
    'friends.title': 'Friends',
    'friends.search_ph': 'Search username...',
    'friends.search_btn': 'Search',
    'friends.requests_title': 'Incoming Requests',
    'friends.list_title': 'Friends',
    'friends.empty': 'No friends yet. Search above!',
    'friends.invite_btn': '✉ Invite by Email',
    'friends.invite_title': 'Invite by Email',
    'friends.invite_friend_email': "Friend's email address",
    'friends.invite_your_name': 'Your name',
    'friends.invite_message': 'Message (optional)',
    'friends.invite_message_ph': 'Want to say something to your friend?',
    'friends.invite_send': 'Send',
    'friends.invite_cancel': 'Cancel',
    'friends.online': '● Online',
    'friends.never_seen': '○ Never seen',
    'friends.mins_ago': 'seen {n} min ago',
    'friends.hours_ago': 'seen {n} hr ago',
    'friends.days_ago': 'seen {n} days ago',
    'friends.long_ago': '○ Offline for a long time',
    'friends.just_offline': '○ Just went offline',
    'friends.invite_action': '⚡ Invite',
    'friends.accept': '✓ Accept',
    'friends.reject': '✕ Decline',
    'friends.is_friend': 'Friends ✓',
    'friends.request_sent': 'Request Sent',
    'friends.add': '+ Add Friend',
    'friends.search_result': 'Search Results',
    'friends.not_found': 'No user found.',
    'friends.grp_invite_title': 'Invite Friends',
    'friends.grp_invite_desc': 'Invite reaches only online friends.',
    'friends.grp_invite_cancel': 'Cancel',
    'friends.grp_invite_send': 'Send Invites',

    // Daily mode
    'daily.yesterday': "Yesterday's Result",
    'daily.today_title': "Today's Puzzle",
    'daily.today_desc': 'Everyone plays with the same letters. Find the most words in 2 min 30 sec!',
    'daily.played_today': 'You played today!',
    'daily.your_score': 'Score:',

    // Multi mode
    'multi.title': 'Multi Mode',
    'multi.have_code': 'Have a room code?',
    'multi.code_ph': '6-digit code',
    'multi.or': 'or',
    'multi.create': '+ Create Game',
    'multi.open_rooms': 'Open Rooms',
    'multi.refresh': '🔄 Refresh',
    'multi.no_open': 'No open rooms right now',
    'multi.host_fill_title': 'Choose Letters',
    'multi.host_fill_hint': 'You can start the game after picking 9 letters',
    'multi.room_code_lbl': 'Room Code',
    'multi.dur_label': 'Duration:',
    'multi.invite_btn': '👥 Invite ▾',
    'multi.inv_open': '👥 Anyone can join',
    'multi.inv_code': '🔑 Share code',
    'multi.inv_friends': '⚡ Invite my friends',
    'multi.start_btn': 'Start Game',
    'multi.players_section': 'Players',
    'multi.pending_section': 'Awaiting Approval',
    'multi.wait_title': 'Game Starting Soon',
    'multi.wait_host': 'Host:',
    'multi.wait_code': 'Room Code:',
    'multi.wait_players': 'Players',
    'multi.leave': 'Leave',
    'multi.result_title': 'Game Over!',
    'multi.found_words': 'Found Words',
    'multi.missed_words': "Nobody Found",
    'multi.exit': '← Exit',

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
    str = str.replaceAll(`{${k}}`, v);
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
