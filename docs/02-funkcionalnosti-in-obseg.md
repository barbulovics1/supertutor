# SuperTutor

## Uporabniške vloge

### Študent
- **Lahko:** se registrira s fakultetnim e-poštnim naslovom, pregleda proste termine svojih tutorjev, pošlje zahtevo za termin z izbranim predmetom, temami in načinom izvedbe (v živo ali online), odpove potrjen termin, vidi obvestilo o odločitvi tutorja.
- **Nima pravic:** ne vidi tutorjevega koledarja v celoti, ne vidi zapiskov o sebi (ali drugih študentov), ne more potrditi ali zavrniti zahteve, ne more urejati tutorjev ali predmetov.

### Tutor
- **Lahko:** označi svojo dostopnost, potrjuje ali zavrača zahteve svojih študentov, pred srečanjem vidi predmet, teme, način izvedbe in prejšnje zapiske, po srečanju označi, ali se je študent pojavil, zapiše zapiske. 
- **Nima pravic:** ne vidi študentov in terminov drugih tutorjev, ne vidi zapiskov drugih tutorjev, ne more sam sebi dodeliti vloge ali dodati novega tutorja, ne more spreminjati zapisov, ki jih je vodil koordinator.

### Koordinator (administrator)
- **Lahko:** vidi vse tutorje, študente, termine in predmete, doda in odstrani tutorje, upravlja predmete, popravi ali odpove termin, pregleda evidenco opravljenih ur po tutorju in predmetu, bere zapiske.
- **Nima pravic:** ne more potrditi zahteve namesto tutorja, ne more pisati zapiskov v imenu tutorja.

## Predvidene funkcionalnosti

### MVP
1. **Označevanje dostopnosti tutorja**: tutor v koledarju označi dneve in ure, ko je na voljo. Termin ni vezan na predmet.
2. **Zahteva za termin**: študent izbere prost termin, predmet (samo med predmeti, ki jih tutor predaja), navede teme, s katerimi potrebuje pomoč, in izbere način izvedbe: v živo (z lokacijo) ali online (s kontaktom, npr. Discord username).
3. **Potrditev ali zavrnitev zahteve**: tutor sprejme ali zavrne zahtevo, študent pa dobi obvestilo v spletni aplikaciji.
4. **Odpoved potrjenega termina z rokom**: študent lahko odpove najkasneje 24 ur pred začetkom. Pozna odpoved se zabeleži.
5. **Priprava na srečanje**: tutor pred uro vidi predmet, teme in zapiske s prejšnjih srečanj s tem študentom.
6. **Zapisek po srečanju**: tutor zapiše, kako študent najbolje uči in kaj mu pomaga. Zapisek vidijo tutor in koordinator.
7. **Registracija in prijava s fakultetnim e-poštnim naslovom**: osnovna avtentikacija, po vlogah.

### Ostale funkcionalnosti
8. **Označba neprihoda**: tutor označi, da se študent na termin ni pojavil.
9. **Odpoved termina s strani tutorja**: tutor odpove potrjen termin, študent dobi obvestilo, termin se sprosti.
10. **Ponavljajoči se termini**: tutor označi tedensko ponavljajočo dostopnost (npr. vsak torek ob 17h).
11. **Evidenca opravljenih ur**: koordinator vidi, koliko ur je tutor opravil po predmetih v semestru.

## Kasnejše nadgradnje
- Obvestila po e-pošti ob novi zahtevi, potrditvi ali odpovedi.
- Ponavljajoči se termini s pravili (npr. vsak drugi teden).
- Statistika za tutorja: koliko študentov ima in kateri predmeti so najpogostejši.
- Ocenjevanje tutorske ure s strani študenta.
- Opomnik tutorju in študentu nekaj ur pred terminom.
- Deljenje gradiva za učenje (npr. naloge ali skripte) ob temi srečanja.
- Iskanje in filtriranje tutorjev po predmetu, dostopnosti in ocenah.
- Prilagoditev spletne aplikacije za uporabo na telefonu, brez posebne mobilne aplikacije (PWA).

## Izven obsega
- Plačilo ali kakršnakoli finančna transakcija (tutorstvo je brezplačno).
- Mobilna aplikacija za Android in iOS (samo spletna verzija).
- Integracija s informacijskim sistemom fakultete (vpis, ocene, urniki), uporabniki se registrirajo ločeno.