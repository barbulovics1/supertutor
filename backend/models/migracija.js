const db = require('./database');

db.exec(`
  CREATE TABLE IF NOT EXISTS uporabnik (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ime TEXT NOT NULL,
    priimek TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    geslo_hash TEXT NOT NULL,
    vloga TEXT NOT NULL CHECK (vloga IN ('student', 'tutor', 'koordinator')),
    smer TEXT
  );

  CREATE TABLE IF NOT EXISTS predmet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tutor_predmet (
    tutor_id INTEGER NOT NULL,
    predmet_id INTEGER NOT NULL,
    PRIMARY KEY (tutor_id, predmet_id),
    FOREIGN KEY (tutor_id) REFERENCES uporabnik(id),
    FOREIGN KEY (predmet_id) REFERENCES predmet(id)
  );

  CREATE TABLE IF NOT EXISTS termin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tutor_id INTEGER NOT NULL,
    student_id INTEGER,
    predmet_id INTEGER,
    datum TEXT NOT NULL,
    zacetek TEXT NOT NULL,
    konec TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'prost',
    teme TEXT,
    nacin_izvedbe TEXT,
    lokacija_kontakt TEXT,
    prisotnost TEXT,
    pozna_odpoved INTEGER DEFAULT 0,
    FOREIGN KEY (tutor_id) REFERENCES uporabnik(id),
    FOREIGN KEY (student_id) REFERENCES uporabnik(id),
    FOREIGN KEY (predmet_id) REFERENCES predmet(id)
  );

  CREATE TABLE IF NOT EXISTS zapisek (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    termin_id INTEGER NOT NULL,
    avtor_id INTEGER NOT NULL,
    besedilo TEXT NOT NULL,
    ustvarjeno_ob TEXT NOT NULL,
    FOREIGN KEY (termin_id) REFERENCES termin(id),
    FOREIGN KEY (avtor_id) REFERENCES uporabnik(id)
  );

  CREATE TABLE IF NOT EXISTS obvestilo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uporabnik_id INTEGER NOT NULL,
    besedilo TEXT NOT NULL,
    prebrano INTEGER DEFAULT 0,
    ustvarjeno_ob TEXT NOT NULL,
    FOREIGN KEY (uporabnik_id) REFERENCES uporabnik(id)
  );
`);

console.log('Tabele so uspešno ustvarjene (ali že obstajajo).');