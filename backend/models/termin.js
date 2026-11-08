const db = require('./database');

function preveriPrekrivanje(tutorId, datum, zacetek, konec) {
  const prekrivanje = db.prepare(`
    SELECT * FROM termin
    WHERE tutor_id = ?
      AND datum = ?
      AND NOT (konec <= ? OR zacetek >= ?)
  `).get(tutorId, datum, zacetek, konec);
  return !!prekrivanje;
}

function ustvariDostopnost(tutorId, datum, zacetek, konec) {
  const stmt = db.prepare(`
    INSERT INTO termin (tutor_id, datum, zacetek, konec, status)
    VALUES (?, ?, ?, ?, 'prost')
  `);
  return stmt.run(tutorId, datum, zacetek, konec);
}

function najdiDostopnostiTutorja(tutorId) {
  return db.prepare(`
    SELECT * FROM termin WHERE tutor_id = ? ORDER BY datum, zacetek
  `).all(tutorId);
}

function najdiPoId(id) {
  return db.prepare('SELECT * FROM termin WHERE id = ?').get(id);
}

function izbrisiDostopnost(id, tutorId) {
  return db.prepare(`
    DELETE FROM termin WHERE id = ? AND tutor_id = ? AND status = 'prost'
  `).run(id, tutorId);
}

module.exports = {
  preveriPrekrivanje,
  ustvariDostopnost,
  najdiDostopnostiTutorja,
  najdiPoId,
  izbrisiDostopnost
};