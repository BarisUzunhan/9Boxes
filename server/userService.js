/**
 * Kullanıcı Servis Katmanı
 *
 * Şu an: JSON dosyası backend (server/users.json)
 *
 * Supabase'e geçiş için yapılacak tek şey:
 *   - _read() / _write() fonksiyonlarını sil
 *   - Her async fonksiyonun içini Supabase client çağrısıyla değiştir
 *   - Fonksiyon imzaları (parametre + dönüş tipi) aynı kalır
 *   - index.js'e dokunmana gerek yok
 *
 * Örnek Supabase karşılıkları (yorum satırı olarak bırakıldı):
 *   getUserByToken(token)  → supabase.from('users').select().eq('token', token).single()
 *   recordGameResult(...)  → supabase.from('users').update({...}).eq('id', id)
 */

const fs   = require('fs');
const path = require('path');

const USERS_PATH = path.join(__dirname, 'users.json');

// ─── JSON arka ucu (Supabase'e geçince bu iki fonksiyon silinir) ──

function _read() {
  try { return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8')); } catch { return []; }
}

function _write(data) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Seviye hesabı ────────────────────────────────────────────────
// Plan: 0-99 → Sv.1 | 100-499 → Sv.2 | 500+ → her 1000 puan +1 seviye

function calcLevel(totalScore) {
  if (totalScore < 100) return 1;
  if (totalScore < 500) return 2;
  return 3 + Math.floor((totalScore - 500) / 1000);
}

// ─── Hassas alanları gizle ────────────────────────────────────────

function safeUser(u) {
  if (!u) return null;
  const { passwordHash, token, ...rest } = u;
  return rest;
}

// ─── Okuma ───────────────────────────────────────────────────────

async function getUserByToken(token) {
  if (!token) return null;
  return _read().find(u => u.token === token) || null;
}

async function getUserByUsername(username) {
  const norm = (username || '').trim().toLocaleLowerCase('tr-TR');
  return _read().find(u => u.username.toLocaleLowerCase('tr-TR') === norm) || null;
}

// ─── Yazma ───────────────────────────────────────────────────────

async function createUser(userData) {
  const users = _read();
  users.push(userData);
  _write(users);
  return userData;
}

async function updateUserToken(id, token) {
  const users = _read();
  const user  = users.find(u => u.id === id);
  if (!user) return null;
  user.token = token;
  _write(users);
  return user;
}

async function deductKL(token, amount) {
  if (!token) return null;
  const users = _read();
  const user  = users.find(u => u.token === token);
  if (!user || (user.klBalance || 0) < amount) return null;
  user.klBalance -= amount;
  _write(users);
  return safeUser(user);
}

/**
 * 1v1 oyun sonucunu kullanıcı kaydına yazar.
 *
 * @param {string} token      - Oyuncunun oturum token'ı (socket.handshake.auth.token)
 * @param {number} scoreDelta - Bu oyunda kazanılan puan
 * @param {boolean} won       - Oyunu kazandı mı? (beraberlik → false)
 * @returns {object|null}     - Güncel kullanıcı (hassas alanlar çıkarılmış) veya null
 */
async function recordGameResult(token, { scoreDelta, won }) {
  if (!token) return null;
  const users = _read();
  const user  = users.find(u => u.token === token);
  if (!user) return null;

  user.totalScore  = (user.totalScore  || 0) + scoreDelta;
  user.klBalance   = (user.klBalance   || 0) + scoreDelta; // 1v1: her puan = 1 KL
  user.gamesPlayed = (user.gamesPlayed || 0) + 1;
  if (won) user.gamesWon = (user.gamesWon || 0) + 1;
  user.level = calcLevel(user.totalScore);

  _write(users);
  return safeUser(user);
}

// ─── Dışa aktarım ────────────────────────────────────────────────

module.exports = {
  calcLevel,
  safeUser,
  getUserByToken,
  getUserByUsername,
  createUser,
  updateUserToken,
  deductKL,
  recordGameResult,
};
