# SuperTutor

Spletna aplikacija za načrtovanje in dogovarjanje tutorskih ur na Fakulteti za elektrotehniko, računalništvo in informatiko (FERI).

## Tehnologije

- Frontend: HTML, CSS, JavaScript, EJS predloge
- Backend: Node.js, Express
- Podatkovna baza: SQLite
- Avtentikacija: seje, bcrypt

## Dokumentacija

Vsa projektna dokumentacija se nahaja v mapi [`docs/`](./docs):

- [Zasnova rešitve](docs/01-zasnova-resitve.md)
- [Funkcionalnosti in obseg](docs/02-funkcionalnosti-in-obseg.md)
- [Podatkovni model](docs/03-podatkovni-model.md)
- [Arhitektura in tehnološki sklad](docs/04-arhitektura-in-tehnoloski-sklad.md)
- [Uporabniške zgodbe](docs/05-uporabniske-zgodbe.md)
- [Wireframes](docs/06-wireframes.md)
- [Arhitekturne odločitve (ADR)](docs/adr)

## Lokalni zagon

1. Namesti [Node.js](https://nodejs.org/) (verzija 18 ali novejša).
2. Kloniraj repozitorij:
   ```
   git clone https://github.com/barbulovics1/supertutor.git
   cd supertutor/backend
   ```
3. Namesti odvisnosti:
   ```
   npm install
   ```
4. Zaženi strežnik:
   ```
   node app.js
   ```
5. Baza (`database.sqlite`) se samodejno ustvari ob prvem zagonu, skupaj z osnovnimi predmeti.
6. Aplikacija je dostopna na [http://localhost:3000](http://localhost:3000).

### Testni računi

Za lažje testiranje je na voljo testni tutor:
- E-pošta: `tutor1@student.um.si`
- Geslo: `geslo123`

Študentski račun si ustvariš prek registracije na `/registracija` (zahtevan e-poštni naslov `@student.um.si`).