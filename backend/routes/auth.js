const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const uporabnik = require('../models/uporabnik');

// Prikaz obrazca
router.get('/registracija', (req, res) => {
  res.render('registracija', { napaka: null, podatki: {} });
});

// Obdelava registracije
router.post('/registracija', (req, res) => {
  const { ime, priimek, email, geslo, geslo2, smer } = req.body;
  const podatki = { ime, priimek, email, smer };

  if (!email.endsWith('@student.um.si')) {
    return res.render('registracija', { napaka: 'E-pošta mora biti @student.um.si naslov.', podatki });
  }

  if (geslo.length < 8) {
    return res.render('registracija', { napaka: 'Geslo mora vsebovati vsaj 8 znakov.', podatki });
  }

  if (geslo !== geslo2) {
    return res.render('registracija', { napaka: 'Gesli se ne ujemata.', podatki });
  }

  if (!smer) {
    return res.render('registracija', { napaka: 'Izberi smer študija.', podatki });
  }

  if (uporabnik.najdiPoEmailu(email)) {
    return res.render('registracija', { napaka: 'Uporabnik s to e-pošto že obstaja.', podatki });
  }

  const gesloHash = bcrypt.hashSync(geslo, 10);
  uporabnik.ustvari({ ime, priimek, email, gesloHash, vloga: 'student', smer });

  res.send('Registracija uspešna! (prijava bo dodana v naslednjem koraku)');
});

module.exports = router;