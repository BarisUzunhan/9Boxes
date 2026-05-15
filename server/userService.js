const supabase = require('./supabase');

// ─── Seviye hesabı ────────────────────────────────────────────────

function calcLevel(totalScore) {
  if (totalScore < 100) return 1;
  if (totalScore < 500) return 2;
  return 3 + Math.floor((totalScore - 500) / 1000);
}

// ─── DB (snake_case) ↔ JS (camelCase) dönüşümü ───────────────────

function fromDB(u) {
  if (!u) return null;
  return {
    id:           u.id,
    username:     u.username,
    passwordHash: u.password_hash,
    token:        u.token,
    totalScore:   u.total_score,
    level:        u.level,
    klBalance:    u.kl_balance,
    gamesPlayed:  u.games_played,
    gamesWon:     u.games_won,
    createdAt:    u.created_at,
  };
}

function toDB(u) {
  return {
    id:            u.id,
    username:      u.username,
    password_hash: u.passwordHash,
    token:         u.token,
    total_score:   u.totalScore   || 0,
    level:         u.level        || 1,
    kl_balance:    u.klBalance    || 0,
    games_played:  u.gamesPlayed  || 0,
    games_won:     u.gamesWon     || 0,
    created_at:    u.createdAt,
  };
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
  const { data } = await supabase
    .from('users').select('*').eq('token', token).maybeSingle();
  return fromDB(data);
}

async function getUserByUsername(username) {
  const norm = (username || '').trim().toLocaleLowerCase('tr-TR');
  const { data } = await supabase
    .from('users').select('*').ilike('username', norm).maybeSingle();
  return fromDB(data);
}

// ─── Yazma ───────────────────────────────────────────────────────

async function createUser(userData) {
  const { data, error } = await supabase
    .from('users').insert(toDB(userData)).select().single();
  if (error) throw error;
  return fromDB(data);
}

async function updateUserToken(id, token) {
  const { data } = await supabase
    .from('users').update({ token }).eq('id', id).select().single();
  return fromDB(data);
}

async function deductKL(token, amount) {
  if (!token) return null;
  const user = await getUserByToken(token);
  if (!user || (user.klBalance || 0) < amount) return null;
  const { data } = await supabase
    .from('users')
    .update({ kl_balance: user.klBalance - amount })
    .eq('id', user.id).select().single();
  return safeUser(fromDB(data));
}

async function recordGameResult(token, { scoreDelta, won }) {
  if (!token) return null;
  const user = await getUserByToken(token);
  if (!user) return null;

  const newScore = (user.totalScore || 0) + scoreDelta;
  const { data } = await supabase
    .from('users')
    .update({
      total_score:  newScore,
      kl_balance:   (user.klBalance  || 0) + scoreDelta,
      games_played: (user.gamesPlayed || 0) + 1,
      games_won:    (user.gamesWon    || 0) + (won ? 1 : 0),
      level:        calcLevel(newScore),
    })
    .eq('id', user.id).select().single();
  return safeUser(fromDB(data));
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
