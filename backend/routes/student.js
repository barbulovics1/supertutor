const express = require('express');
const router = express.Router();
const uporabnik = require('../models/uporabnik');
const termin = require('../models/termin');

function zahtevajStudenta(req, res, next) {
  if (!req.session.uporabnik || req.session.uporabnik.vloga !== 'student') {
    return res.redirect('/prijava');
  }
  next();
}

router.get('/student/tutorji', zahtevajStudenta, (req, res) => {
  const tutorji = uporabnik.najdiTutorje();
  res.render('seznam-tutorjev', { tutorji });
});

router.get('/student/tutor/:id', zahtevajStudenta, (req, res) => {
  const tutor = uporabnik.najdiPoId(req.params.id);
  const termini = termin.najdiProsteTermineTutorja(req.params.id);
  res.render('prosti-termini', { tutor, termini });
});

const predmet = require('../models/predmet');

router.get('/student/zahteva/:terminId', zahtevajStudenta, (req, res) => {
  const t = termin.najdiPoId(req.params.terminId);

  if (!t || t.status !== 'prost') {
    return res.redirect('/student/tutorji');
  }

  const predmeti = predmet.najdiPredmetovTutorja(t.tutor_id);
  res.render('zahteva-termin', { termin: t, predmeti, napaka: null });
});

router.post('/student/zahteva/:terminId', zahtevajStudenta, (req, res) => {
  const { predmet_id, teme, nacin_izvedbe, lokacija_kontakt } = req.body;
  const t = termin.najdiPoId(req.params.terminId);

  if (!t || t.status !== 'prost') {
    return res.redirect('/student/tutorji');
  }

  if (!teme || teme.trim() === '') {
    const predmeti = predmet.najdiPredmetovTutorja(t.tutor_id);
    return res.render('zahteva-termin', { termin: t, predmeti, napaka: 'Polje za teme je obvezno.' });
  }

  if (nacin_izvedbe !== 'v_zivo' && nacin_izvedbe !== 'online') {
    const predmeti = predmet.najdiPredmetovTutorja(t.tutor_id);
    return res.render('zahteva-termin', { termin: t, predmeti, napaka: 'Izberi način izvedbe.' });
  }

  if (!lokacija_kontakt || lokacija_kontakt.trim() === '') {
    const predmeti = predmet.najdiPredmetovTutorja(t.tutor_id);
    const polje = nacin_izvedbe === 'v_zivo' ? 'Lokacija' : 'Kontakt';
    return res.render('zahteva-termin', { termin: t, predmeti, napaka: `${polje} je obvezen podatek.` });
  }

  const rezultat = termin.oddajZahtevo(
    t.id, req.session.uporabnik.id, predmet_id, teme, nacin_izvedbe, lokacija_kontakt
  );

  if (rezultat.changes === 0) {
    return res.render('zahteva-termin-nedostopen', {});
  }

  res.send('Zahteva je bila uspešno poslana!');
});

router.get('/student/termini', zahtevajStudenta, (req, res) => {
  const termini = termin.najdiPotrjeneTermineStudenta(req.session.uporabnik.id);
  res.render('moji-termini', { termini });
});

router.post('/student/termin/:id/odpovej', zahtevajStudenta, (req, res) => {
  const rezultat = termin.odpoviStudent(req.params.id, req.session.uporabnik.id);
  res.redirect('/student/termini');
});

module.exports = router;