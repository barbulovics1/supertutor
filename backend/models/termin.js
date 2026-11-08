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

function najdiProsteTermineTutorja(tutorId) {
  return db.prepare(`
    SELECT * FROM termin WHERE tutor_id = ? AND status = 'prost' ORDER BY datum, zacetek
  `).all(tutorId);
}

function oddajZahtevo(terminId, studentId, predmetId, teme, nacinIzvedbe, lokacijaKontakt) {
  const stmt = db.prepare(`
    UPDATE termin
    SET student_id = ?, predmet_id = ?, teme = ?, nacin_izvedbe = ?, lokacija_kontakt = ?, status = 'caka_potrditev'
    WHERE id = ? AND status = 'prost'
  `);
  return stmt.run(studentId, predmetId, teme, nacinIzvedbe, lokacijaKontakt, terminId);
}

function najdiCakajoceZahteve(tutorId) {
  return db.prepare(`
    SELECT termin.*, predmet.naziv AS predmet_naziv, uporabnik.ime AS student_ime, uporabnik.priimek AS student_priimek
    FROM termin
    JOIN predmet ON termin.predmet_id = predmet.id
    JOIN uporabnik ON termin.student_id = uporabnik.id
    WHERE termin.tutor_id = ? AND termin.status = 'caka_potrditev'
    ORDER BY termin.datum, termin.zacetek
  `).all(tutorId);
}

module.exports = {
  preveriPrekrivanje,
  ustvariDostopnost,
  najdiDostopnostiTutorja,
  najdiPoId,
  izbrisiDostopnost,
  najdiProsteTermineTutorja,
  oddajZahtevo,
  najdiCakajoceZahteve
};