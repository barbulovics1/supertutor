const express = require('express');
const session = require('express-session');
const path = require('path');
require('./models/migracija'); // ustvari tabele ob zagonu, če še ne obstajajo

const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// EJS kot template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware za branje podatkov iz obrazcev
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Seje
app.use(session({
  secret: 'supertutor-skrivnost',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } 
}));

// Testna začetna stran
app.get('/', (req, res) => {
  res.send('SuperTutor strežnik deluje!');
});

app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Strežnik teče na http://localhost:${PORT}`);
});