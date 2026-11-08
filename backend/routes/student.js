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

module.exports = router;