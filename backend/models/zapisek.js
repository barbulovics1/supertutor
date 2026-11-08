const db = require('./database');

function najdiZapiskeZaStudenta(studentId) {
  return db.prepare(`
    SELECT * FROM zapisek
    WHERE termin_id IN (SELECT id FROM termin WHERE student_id = ?)
    ORDER BY ustvarjeno_ob DESC
  `).all(studentId);
}

function ustvari(terminId, avtorId, besedilo) {
  return db.prepare(`
    INSERT INTO zapisek (termin_id, avtor_id, besedilo, ustvarjeno_ob)
    VALUES (?, ?, ?, datetime('now'))
  `).run(terminId, avtorId, besedilo);
}

function najdiPoId(id, avtorId) {
  return db.prepare('SELECT * FROM zapisek WHERE id = ? AND avtor_id = ?').get(id, avtorId);
}

function posodobi(id, avtorId, besedilo) {
  return db.prepare(`
    UPDATE zapisek SET besedilo = ? WHERE id = ? AND avtor_id = ?
  `).run(besedilo, id, avtorId);
}

module.exports = { najdiZapiskeZaStudenta, ustvari, najdiPoId, posodobi };