const db = require('./database');

function najdiPredmetovTutorja(tutorId) {
  return db.prepare(`
    SELECT predmet.* FROM predmet
    JOIN tutor_predmet ON predmet.id = tutor_predmet.predmet_id
    WHERE tutor_predmet.tutor_id = ?
  `).all(tutorId);
}

module.exports = { najdiPredmetovTutorja };