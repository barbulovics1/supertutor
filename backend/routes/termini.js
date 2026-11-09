const express = require('express');
const router = express.Router();
const termin = require('../models/termin');
const obvestilo = require('../models/obvestilo');
const zapisek = require('../models/zapisek');

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

router.get('/tutor/zahteve', zahtevajTutorja, (req, res) => {
  const zahteve = termin.najdiCakajoceZahteve(req.session.uporabnik.id);
  const potrjeniTermini = termin.najdiPotrjeneTermineTutorja(req.session.uporabnik.id);
  const obvestila = obvestilo.najdiNeprebrana(req.session.uporabnik.id);
  obvestilo.oznaciVsaPrebrana(req.session.uporabnik.id);
  res.render('cakajoce-zahteve', { zahteve, potrjeniTermini, obvestila });
});


router.post('/tutor/zahteve/:id/potrdi', zahtevajTutorja, (req, res) => {
  termin.potrdiZahtevo(req.params.id, req.session.uporabnik.id);
  res.redirect('/tutor/zahteve');
});

router.post('/tutor/zahteve/:id/zavrni', zahtevajTutorja, (req, res) => {
  termin.zavrniZahtevo(req.params.id, req.session.uporabnik.id);
  res.redirect('/tutor/zahteve');
});

router.get('/tutor/priprava/:terminId', zahtevajTutorja, (req, res) => {
  const t = termin.najdiPotrjenTermin(req.params.terminId, req.session.uporabnik.id);

  if (!t) {
    return res.redirect('/tutor/zahteve');
  }

  const zapiski = zapisek.najdiZapiskeZaStudenta(t.student_id);
  const preteklo = termin.jePreteklo(t.id);
  res.render('priprava-na-srecanje', { termin: t, zapiski, preteklo });
});

router.post('/tutor/priprava/:terminId/zapisek', zahtevajTutorja, (req, res) => {
  const t = termin.najdiPotrjenTermin(req.params.terminId, req.session.uporabnik.id);

  if (!t || !termin.jePreteklo(t.id)) {
    return res.redirect('/tutor/zahteve');
  }

  zapisek.ustvari(t.id, req.session.uporabnik.id, req.body.besedilo);
  res.redirect(`/tutor/priprava/${t.id}`);
});

router.get('/tutor/zapisek/:id/uredi', zahtevajTutorja, (req, res) => {
  const z = zapisek.najdiPoId(req.params.id, req.session.uporabnik.id);

  if (!z) {
    return res.redirect('/tutor/zahteve');
  }

  res.render('uredi-zapisek', { zapisek: z });
});

router.post('/tutor/zapisek/:id/uredi', zahtevajTutorja, (req, res) => {
  const z = zapisek.najdiPoId(req.params.id, req.session.uporabnik.id);

  if (!z) {
    return res.redirect('/tutor/zahteve');
  }

  zapisek.posodobi(req.params.id, req.session.uporabnik.id, req.body.besedilo);
  res.redirect(`/tutor/priprava/${z.termin_id}`);
});

module.exports = router;