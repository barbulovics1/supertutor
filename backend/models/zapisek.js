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

module.exports = { najdiZapiskeZaStudenta, ustvari };