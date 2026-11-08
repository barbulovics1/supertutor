const db = require('./database');

function najdiZapiskeZaStudenta(studentId) {
  return db.prepare(`
    SELECT * FROM zapisek
    WHERE termin_id IN (SELECT id FROM termin WHERE student_id = ?)
    ORDER BY ustvarjeno_ob DESC
  `).all(studentId);
}

module.exports = { najdiZapiskeZaStudenta };