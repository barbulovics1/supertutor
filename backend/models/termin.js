const db = require('./database');
const obvestilo = require('./obvestilo');

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

function potrdiZahtevo(terminId, tutorId) {
  return db.prepare(`
    UPDATE termin SET status = 'potrjen'
    WHERE id = ? AND tutor_id = ? AND status = 'caka_potrditev'
  `).run(terminId, tutorId);
}

function zavrniZahtevo(terminId, tutorId) {
  return db.prepare(`
    UPDATE termin
    SET status = 'prost', student_id = NULL, predmet_id = NULL, teme = NULL, nacin_izvedbe = NULL, lokacija_kontakt = NULL
    WHERE id = ? AND tutor_id = ? AND status = 'caka_potrditev'
  `).run(terminId, tutorId);
}

function izracunajPoznoOdpoved(datum, zacetek) {
  const terminDatum = new Date(`${datum}T${zacetek}`);
  const sedaj = new Date();
  const razlikaUrah = (terminDatum - sedaj) / (1000 * 60 * 60);
  return razlikaUrah < 24;
}

function odpoviStudent(terminId, studentId) {
  const t = db.prepare(`
    SELECT termin.*, uporabnik.ime AS student_ime, uporabnik.priimek AS student_priimek
    FROM termin JOIN uporabnik ON termin.student_id = uporabnik.id
    WHERE termin.id = ? AND termin.student_id = ?
  `).get(terminId, studentId);

  if (!t || t.status !== 'potrjen') {
    return { uspeh: false };
  }

  const pozna = izracunajPoznoOdpoved(t.datum, t.zacetek) ? 1 : 0;

  db.prepare(`
    UPDATE termin
    SET status = 'prost', student_id = NULL, predmet_id = NULL, teme = NULL,
        nacin_izvedbe = NULL, lokacija_kontakt = NULL, pozna_odpoved = ?
    WHERE id = ?
  `).run(pozna, terminId);

  const besedilo = `${t.student_ime} ${t.student_priimek} je odpovedal(a) termin ${t.datum} ob ${t.zacetek} (${pozna ? 'pozna' : 'pravočasna'} odpoved).`;
  obvestilo.ustvari(t.tutor_id, besedilo);

  return { uspeh: true, pozna: !!pozna };
}

function najdiPotrjeneTermineStudenta(studentId) {
  return db.prepare(`
    SELECT termin.*, predmet.naziv AS predmet_naziv, uporabnik.ime AS tutor_ime, uporabnik.priimek AS tutor_priimek
    FROM termin
    JOIN predmet ON termin.predmet_id = predmet.id
    JOIN uporabnik ON termin.tutor_id = uporabnik.id
    WHERE termin.student_id = ? AND termin.status = 'potrjen'
    ORDER BY termin.datum, termin.zacetek
  `).all(studentId);
}

function najdiPotrjenTermin(terminId, tutorId) {
  return db.prepare(`
    SELECT termin.*, predmet.naziv AS predmet_naziv, uporabnik.ime AS student_ime, uporabnik.priimek AS student_priimek
    FROM termin
    JOIN predmet ON termin.predmet_id = predmet.id
    JOIN uporabnik ON termin.student_id = uporabnik.id
    WHERE termin.id = ? AND termin.tutor_id = ? AND termin.status = 'potrjen'
  `).get(terminId, tutorId);
}

function jePreteklo(terminId) {
  const t = db.prepare('SELECT datum, konec FROM termin WHERE id = ?').get(terminId);
  if (!t) return false;
  const terminKonec = new Date(`${t.datum}T${t.konec}`);
  return terminKonec < new Date();
}

module.exports = {
  preveriPrekrivanje,
  ustvariDostopnost,
  najdiDostopnostiTutorja,
  najdiPoId,
  izbrisiDostopnost,
  najdiProsteTermineTutorja,
  oddajZahtevo,
  najdiCakajoceZahteve,
  potrdiZahtevo,
  zavrniZahtevo,
  izracunajPoznoOdpoved,
  odpoviStudent,
  najdiPotrjeneTermineStudenta,
  najdiPotrjenTermin,
  jePreteklo
};