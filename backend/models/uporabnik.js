const db = require('./database');

function najdiPoEmailu(email) {
  return db.prepare('SELECT * FROM uporabnik WHERE email = ?').get(email);
}

function najdiTutorje() {
  return db.prepare("SELECT * FROM uporabnik WHERE vloga = 'tutor'").all();
}

function ustvari({ ime, priimek, email, gesloHash, vloga, smer }) {
  const stmt = db.prepare(`
    INSERT INTO uporabnik (ime, priimek, email, geslo_hash, vloga, smer)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(ime, priimek, email, gesloHash, vloga, smer);
}

function najdiPoId(id) {
  return db.prepare('SELECT * FROM uporabnik WHERE id = ?').get(id);
}

module.exports = { najdiPoEmailu, ustvari, najdiTutorje, najdiPoId };