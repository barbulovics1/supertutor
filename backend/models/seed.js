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

const uporabnik = require('./uporabnik');
const bcrypt = require('bcryptjs');

const obstojeciTutor = uporabnik.najdiPoEmailu('tutor1@student.um.si');

if (!obstojeciTutor) {
  uporabnik.ustvari({
    ime: 'Stefan',
    priimek: 'Barbulovic',
    email: 'tutor1@student.um.si',
    gesloHash: bcrypt.hashSync('geslo123', 10),
    vloga: 'tutor',
    smer: 'Telekomunikacije'
  });
  console.log('Testni tutor je bil dodan (tutor1@student.um.si / geslo123).');
} else {
  console.log('Testni tutor že obstaja.');
}