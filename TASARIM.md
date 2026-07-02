# 9Boxes — Tasarım Dokümanı

## Bağlam

9Boxes, Türkçe odaklı bir online kelime yarışı oyunudur. Temel mekaniği: 3×3 (9 harfli) bir matrisi iki oyuncunun sırayla doldurması, ardından 3 dakika boyunca matristeki harflerle (kullanım sayısı kadar) sözlükte yer alan geçerli kelimeleri yazmaya çalışmasıdır. Karşı tarafta olmayan her kelime, harf sayısı kadar puan kazandırır.

Dokümanda tanımlı geniş özellik kümesi: 1v1 online + tek oyunculu + sınıf modu (çoklu) + günlük oyun, hesap & sosyal giriş, arkadaş sistemi, ipucu, KL oyun parası, seviye sistemi, mesajlaşma, sözlük yönetimi/itiraz, admin panel, bot rakip.

**Geliştirme profili:**
- Yazılım deneyimi sınırlı; HTML / CSS / JS rahat olunan kısım.
- Yaklaşım: **Aşamalı MVP** — her aşamanın sonunda çalışan bir sürüm olacak.
- Platform: Önce **web + PWA** (mobilde de tarayıcıda çalışır, ana ekrana eklenebilir). Sonradan native mobil yolu açık.
- Hedef: Önce lokalde öğren, sonra ücretsiz tier hosting'e yayınla.
- Sözlük: Açık kaynak / TDK temelli temel liste **+** bizim kontrol ettiğimiz onay/red katmanı.

---

## Teknoloji Yığını

| Katman | Seçim | Notlar |
|---|---|---|
| **Frontend** | Vanilla **HTML + CSS + JavaScript** (ES module) | Framework yok. |
| **Backend** | **Node.js + Express** | JavaScript tek dilli. |
| **Gerçek zamanlı** | **Socket.IO** | 1v1, arkadaş daveti, online durum. |
| **Veritabanı** | **Supabase** (PostgreSQL) | ORM yok, doğrudan Supabase JS client. |
| **Auth** | bcrypt + token (users tablosunda) | E-posta doğrulama Brevo ile. |
| **E-posta** | **Brevo** (transactional) | Doğrulama, şifre sıfırlama, arkadaş daveti. |
| **Hosting** | **Render** (backend + frontend birlikte) | Ücretsiz tier, otomatik deploy (GitHub). |
| **Cron** | **cron-job.org** | Supabase ping (uyku önleme) + günlük KL dağıtımı. |
| **Native (planlı)** | **Capacitor** | Aynı HTML/CSS/JS → Android+iOS. |
| **Sözlük** | TDK kaynaklı 46.822 kelime | Admin override + kullanıcı itirazı katmanı. |

---

## Kritik Mimari Kararlar

### Sözlük yönetimi

Üç katman:

- `base_words` — Açık kaynaktan içe aktarılan ham liste.
- `admin_overrides` — `approved` / `rejected` kararları.
- `user_disputes` — Kullanıcı itirazları; admin paneline düşer.

**Geçerlilik algoritması:**
```
override = admin_overrides[word]
if override == 'rejected'  → geçersiz
if override == 'approved'  → geçerli
if word in base_words      → geçerli
else                       → geçersiz
```

**Sesteş kelimeler:** `homophone_words` listesi — bu kelimeler oyunda iki kez yazılabilir.

**Emir kipi filtresi:** MVP'de Zemberek-NLP çıktısı; derin morfoloji Faz 6'da.

### 1v1 Eşzamanlılık

- Oyun durumu **sunucuda** tutulur.
- Her oyun `roomId` ile Socket.IO room.
- Zamanlayıcı sunucuda; istemciye tick gönderilir.
- Bağlantı koparsa: 30 sn reconnect penceresi.

### Veritabanı Şeması

```
users         (id, username UNIQUE, email, password_hash, social_provider, social_id,
               language, total_score, level, kl_balance, created_at)
games         (id, mode, status, started_at, ended_at, winner_id)
game_players  (game_id, user_id, score, hints_used, joined_at)
game_words    (id, game_id, user_id, word, letter_count, score, status)
matrix_letters(game_id, position [0-8], letter)
friendships   (user_id, friend_id, status, created_at)
invitations   (from_user, to_user, game_id, status, expires_at)
base_words        (word PK)
admin_overrides   (word PK, decision, decided_by, decided_at, reason)
user_disputes     (id, user_id, word, game_id, status, created_at, resolved_at)
homophone_words   (word, count)
daily_game        (id, date UNIQUE, matrix_letters, ended)
chat_messages     (game_id, from_user, to_user, message_template_id, sent_at)
```

---

## Aşamalı Yol Haritası

### ✅ Faz 0–1 — Tek Oyunculu Çekirdek
- 3×3 matris UI, harf seçimi (sıralı + rastgele + tümünü doldur).
- 5 sn geri sayım + 2 dk oyun saati.
- Kelime girişi, skor, yan panel, özet ekranı, ses efektleri.

### ✅ Faz 2 — Sözlük
- TDK kaynaklı 46.822 kelime.
- Sesteş kelime desteği, blacklist, admin override.
- 46.819 kelimenin Supabase'de anlamları (word_meanings tablosu).

### ✅ Faz 3 — Hesap & Profil
- Kayıt / giriş (bcrypt + token), e-posta doğrulama (Brevo).
- Şifre sıfırlama, şifre tekrar + göster/gizle.
- Profil popup: seviye, puan, KL, istatistikler.

### ✅ Faz 4 — Online 1v1 (Socket.IO)
- Eşleştirme kuyruğu.
- Sıralı harf doldurma (turnus), kelime doğrulama sunucuda.
- Sonuç: karşılaştırma tablosu, puan hesabı (ortak olmayan kelimeler).
- Yeniden bağlanma (reconnect), +30sn uzatma.

### ✅ Faz 5 — KL, İpucu, Günlük Oyun
- KL bakiyesi; 150 KL = 1 ipucu.
- Günlük oyun: herkes aynı 9 harfli kelime, 2dk30sn, cron ile gün sonu KL dağıtımı (1.→300, 2.→200, 3.→100, ilk 100→20 KL).
- Gün sonu KL dağıtımı: cron-job.org → `/api/daily/finalize`.

### ✅ Faz 6 — Sosyal & Arkadaş Sistemi
- Arkadaş ekleme/çıkarma, arkadaşlık istekleri.
- Online durum: `last_seen` DB tabanlı (5 dk pencere), son görülme zamanı.
- Oyun içi arkadaş daveti (socket, 30sn countdown).
- E-posta ile arkadaş daveti (Brevo).

### ✅ Faz 7 — Admin Panel & İtiraz
- `/admin` sayfası: sözlük yönetimi, sesteş kelimeler, blacklist.
- Kullanıcı itirazı → admin onayı → sözlüğe ekleme (anlam girişiyle birlikte).

### 🔲 Faz 8 — Çoklu Mod (Sıradaki)
- Oda tabanlı: 3–8 oyuncu aynı anda aynı harflerle.
- Puan = harf sayısı × (yazan sadece sen ise +bonus).
- Lobi kodu / davet linki ile odaya katılım.

### 🔲 Faz 9 — PWA & Native
- `manifest.json` + Service Worker.
- Capacitor ile Android + iOS.
- Push notification (arkadaş daveti için).

### 🔲 Faz 10 — Yayına Alma & Monetizasyon
- CrazyGames SDK + sitelock entegrasyonu.
- Domain, analitik, KVKK.

---

## Klasör Yapısı

```
9Boxes/
├── client/
│   ├── index.html
│   ├── css/
│   ├── js/
│   │   ├── game.js       # Oyun mantığı
│   │   ├── ui.js         # DOM
│   │   ├── socket.js     # Socket.IO istemci
│   │   └── api.js        # REST çağrıları
│   ├── assets/           # Sesler, ikonlar
│   └── manifest.json
├── server/
│   ├── index.js
│   ├── routes/
│   ├── sockets/
│   ├── game/
│   ├── dictionary/
│   └── auth/
├── shared/
├── prisma/
│   └── schema.prisma
├── data/
│   ├── base_words.txt
│   └── homophones.txt
├── TASARIM.md            # Bu dosya
└── package.json
```

---

## Bekleyen Kararlar (Sıradaki Fazlarda Netleşecek)

1. **Domain** — `verbum9.com` müsaitlik kontrolü (Faz 9 öncesi).
2. **Logo / görsel kimlik** — Faz 8'de.
3. **Çoklu dil** — MVP sadece Türkçe.
4. **KVKK/yasal** — Faz 9 öncesi.
5. **Bot zekası** — Başlangıçta basit; daha akıllı bot Faz 6'da.

---

## Sürüm Geçmişi

### v1.4 — 2026-04-28
- Giriş / Kayıt ekranı eklendi (bcryptjs şifre hashleme, token tabanlı oturum, localStorage).
- Ana lobi yeniden tasarlandı: oyun modu kartları (Tek Oyunculu, 1v1, Günlük, Çoklu).
- Kullanıcı profil popup'ı eklendi: seviye, toplam puan, KL bakiyesi, oyun istatistikleri, çıkış yapma.
- Kullanıcı verileri `data/users.json`'da saklanıyor; sunucu `/api/auth/register`, `/api/auth/login`, `/api/auth/me` rotaları.
- Sunucu başlarken yerel ağ IP adresini yazar (telefon bağlantısı için).

### v1.3 — 2026-04-26
- Kullanıcı itiraz sistemi tamamlandı: geçersiz kelimelerin yanına "İtiraz Et" düğmesi eklendi (hem oyun sırasındaki kelimeler panelinde hem de sonuç ekranında).
- `POST /api/disputes` ile itiraz kaydedilir; `/admin` panelinin İtirazlar sekmesinden onaylanabilir/reddedilebilir.
- Onaylanan itirazlar otomatik olarak `words.json`'a eklenir.

### v1.2 — 2026-04-26
- Geri sayım sırasında matris görünür hale getirildi (overlay yaklaşımı).
- `/admin` sesteş kelime yönetim paneli eklendi (ekleme/silme, words.json'a yazılır).
- Oyun sonunda "Diğer Kelimeler" düğmesiyle kaçırılan kelimelerin listesi gösterildi.

### v1.1 — 2026-04-26
- Sözlük TDK kaynaklı mertemin/turkish-word-list ile güncellendi: 686 → 46.819 kelime.
- Çok kelimeli ifadeler, özel isimler, rakam/noktalama içeren kelimeler filtrelendi.
- `/sozluk` arama sayfası eklendi — tarayıcıdan tüm kelimelere bakılabilir.

### v1.0 — 2026-04-26
- İlk tasarım dokümanı oluşturuldu.
- `Vebum9.docx` analiz edildi; tüm özellikler özetlendi.
- Teknoloji yığını ve 11 fazlı yol haritası belirlendi.
- Sözlük üç katmanlı mimari tanımlandı.
- Veritabanı şema taslağı oluşturuldu.
