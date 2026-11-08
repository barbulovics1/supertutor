const db = require('./database');

function ustvari(uporabnikId, besedilo) {
  return db.prepare(`
    INSERT INTO obvestilo (uporabnik_id, besedilo, ustvarjeno_ob)
    VALUES (?, ?, datetime('now'))
  `).run(uporabnikId, besedilo);
}

function najdiNeprebrana(uporabnikId) {
  return db.prepare(`
    SELECT * FROM obvestilo WHERE uporabnik_id = ? AND prebrano = 0 ORDER BY id DESC
  `).all(uporabnikId);
}

function oznaciVsaPrebrana(uporabnikId) {
  return db.prepare(`
    UPDATE obvestilo SET prebrano = 1 WHERE uporabnik_id = ?
  `).run(uporabnikId);
}

module.exports = { ustvari, najdiNeprebrana, oznaciVsaPrebrana };