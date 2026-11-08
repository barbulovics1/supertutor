const express = require('express');
const router = express.Router();
const termin = require('../models/termin');

function zahtevajTutorja(req, res, next) {
  if (!req.session.uporabnik || req.session.uporabnik.vloga !== 'tutor') {
    return res.redirect('/prijava');
  }
  next();
}

router.get('/tutor/dostopnost', zahtevajTutorja, (req, res) => {
  const dostopnosti = termin.najdiDostopnostiTutorja(req.session.uporabnik.id);
  res.render('tutor-dostopnost', { napaka: null, dostopnosti });
});

router.post('/tutor/dostopnost', zahtevajTutorja, (req, res) => {
  const { datum, zacetek, konec } = req.body;
  const tutorId = req.session.uporabnik.id;

  if (termin.preveriPrekrivanje(tutorId, datum, zacetek, konec)) {
    const dostopnosti = termin.najdiDostopnostiTutorja(tutorId);
    return res.render('tutor-dostopnost', {
      napaka: 'Dostopnost se prekriva z že obstoječo.',
      dostopnosti
    });
  }

  termin.ustvariDostopnost(tutorId, datum, zacetek, konec);
  res.redirect('/tutor/dostopnost');
});

router.post('/tutor/dostopnost/:id/izbrisi', zahtevajTutorja, (req, res) => {
  const obstojeciTermin = termin.najdiPoId(req.params.id);

  if (!obstojeciTermin || obstojeciTermin.tutor_id !== req.session.uporabnik.id) {
    return res.redirect('/tutor/dostopnost');
  }

  if (obstojeciTermin.status !== 'prost') {
    const dostopnosti = termin.najdiDostopnostiTutorja(req.session.uporabnik.id);
    return res.render('tutor-dostopnost', {
      napaka: 'Tega termina ni mogoče izbrisati, ker je zanj že oddana zahteva.',
      dostopnosti
    });
  }

  termin.izbrisiDostopnost(req.params.id, req.session.uporabnik.id);
  res.redirect('/tutor/dostopnost');
});

module.exports = router;