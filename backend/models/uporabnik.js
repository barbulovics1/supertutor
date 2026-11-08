const db = require('./database');

function najdiPoEmailu(email) {
  return db.prepare('SELECT * FROM uporabnik WHERE email = ?').get(email);
}

function ustvari({ ime, priimek, email, gesloHash, vloga, smer }) {
  const stmt = db.prepare(`
    INSERT INTO uporabnik (ime, priimek, email, geslo_hash, vloga, smer)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(ime, priimek, email, gesloHash, vloga, smer);
}

module.exports = { najdiPoEmailu, ustvari };