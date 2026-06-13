/**
 * groupRoomStore.js
 * Grup odası durumunu Supabase'de kalıcı kılar.
 * Canlı socket referansları ASLA yazılmaz; yalnızca serileştirilebilir alanlar.
 * Tüm yazma işlemleri fire-and-forget'tir — DB hatası oyunu bloklamaz.
 */

const supabase = require('./supabase');

/**
 * Room nesnesini DB satırına dönüştürür (socket ref'leri çıkar).
 */
function serialize(room) {
  return {
    code: room.code,
    host_user_id: String(room.host.userId),
    host_display_name: room.host.displayName || room.host.username || '',
    lang: room.lang,
    matrix: room.matrix || [],
    duration: room.duration,
    status: room.status,
    join_mode: room.joinMode,
    players: (room.players || []).map(p => ({
      userId: String(p.userId),
      username: p.username || '',
      displayName: p.displayName || '',
      score: p.score || 0,
      words: p.words || [],
    })),
    time_left: room.timeLeft,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Odayı DB'ye yazar/günceller (upsert). Fire-and-forget.
 */
function upsertRoom(room) {
  supabase
    .from('group_rooms')
    .upsert(serialize(room), { onConflict: 'code' })
    .then(({ error }) => { if (error) console.error('[groupRoomStore.upsert]', error.message); })
    .catch(err => console.error('[groupRoomStore.upsert]', err));
}

/**
 * Odayı DB'den siler. Fire-and-forget.
 */
function deleteRoom(code) {
  supabase
    .from('group_rooms')
    .delete()
    .eq('code', code)
    .then(({ error }) => { if (error) console.error('[groupRoomStore.delete]', error.message); })
    .catch(err => console.error('[groupRoomStore.delete]', err));
}

/**
 * Tüm kayıtlı odaları DB'den yükler (boot'ta bir kez çağrılır).
 * @returns {Promise<Array>} DB satır dizisi
 */
async function loadAll() {
  const { data, error } = await supabase
    .from('group_rooms')
    .select('*');
  if (error) {
    console.error('[groupRoomStore.loadAll]', error.message);
    return [];
  }
  return data || [];
}

module.exports = { upsertRoom, deleteRoom, loadAll };
