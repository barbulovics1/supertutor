const db = require('./database');

const predmeti = ['Matematika', 'Programiranje 1', 'Optične komunikacije', 'Mehanika'];

const vstavi = db.prepare('INSERT INTO predmet (naziv) VALUES (?)');

const obstojeci = db.prepare('SELECT COUNT(*) AS stevilo FROM predmet').get();

if (obstojeci.stevilo === 0) {
  predmeti.forEach((naziv) => vstavi.run(naziv));
  console.log('Osnovni predmeti so bili dodani.');
} else {
  console.log('Predmeti že obstajajo, seed preskočen.');
}