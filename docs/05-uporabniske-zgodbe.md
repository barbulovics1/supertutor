# Uporabniške zgodbe

## US-01
**Povezana funkcionalnost:** 7 - Registracija in prijava s fakultetnim e-poštnim naslovom

**Uporabniška vloga:** Študent

**User story:** Kot študent želim se registrirati s fakultetnim e-poštnim naslovom, da lahko začnem uporabljati aplikacijo.

**Acceptance criteria:**
- Sistem sprejme registracijo samo, če se e-poštni naslov konča na `@student.um.si`.
- Sistem zavrne registracijo in prikaže napako, če e-poštni naslov ne ustreza zahtevani domeni.
- Geslo mora vsebovati vsaj 8 znakov, sicer sistem prikaže napako.
- Sistem zahteva vnos gesla dvakrat (potrditev gesla); če se gesli ne ujemata, prikaže napako.
- Ob registraciji mora študent izbrati svoj smer študija s seznama, sicer registracija ni mogoča.

## US-02
**Povezana funkcionalnost:** 7 - Registracija in prijava s fakultetnim e-poštnim naslovom

**Uporabniška vloga:** Vse vloge (študent, tutor, koordinator)

**User story:** Kot uporabnik želim se prijaviti z e-pošto in geslom, da dostopam do svojega računa.

**Acceptance criteria:**
- Sistem preveri ujemanje vnesene e-pošte in gesla z bazo.
- Ob napačnem geslu ali e-pošti sistem prikaže splošno napako ("napačni podatki za prijavo"), brez razkritja, kateri podatek je napačen.
- Po uspešni prijavi je uporabnik preusmerjen na stran, ki ustreza njegovi vlogi (študent, tutor ali koordinator).
- Seja ostane aktivna, dokler se uporabnik ne odjavi ali je neaktiven dlje časa (npr. 60 minut).

## US-03
**Povezana funkcionalnost:** 1 - Označevanje dostopnosti tutorja

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim označiti, kdaj sem na voljo, da lahko študenti vidijo in zahtevajo proste termine.

**Acceptance criteria:**
- Tutor lahko izbere datum ter uro začetka in konca dostopnosti.
- Sistem prepreči dodajanje dostopnosti, ki se časovno prekriva z že obstoječo dostopnostjo istega tutorja.
- Dodana dostopnost je takoj vidna študentom, ki imajo tega tutorja.
- Tutor lahko izbriše dostopnost, dokler zanjo ni oddane zahteve.

## US-04
**Povezana funkcionalnost:** 2 - Zahteva za termin

**Uporabniška vloga:** Študent

**User story:** Kot študent želim izbrati prost termin in poslati zahtevo z izbranim predmetom in temami, da tutor ve, s čim potrebujem pomoč.

**Acceptance criteria:**
- Študent izbere enega od prostih terminov izbranega tutorja.
- Študent lahko izbere samo med predmeti, ki jih izbrani tutor dejansko predaja.
- Polje za teme je obvezno; zahteve brez vpisanih tem sistem ne sprejme.
- Študent mora izbrati način izvedbe (v živo ali online); pri "v živo" je lokacija obvezna, pri "online" je kontakt obvezen.
- Sistem prepreči oddajo zahteve za termin, ki je medtem že zaseden s strani drugega študenta.

## US-05
**Povezana funkcionalnost:** 3 - Potrditev ali zavrnitev zahteve

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim potrditi ali zavrniti prejeto zahtevo za termin, da se termin dokončno uredi.

**Acceptance criteria:**
- Tutor vidi vse čakajoče zahteve s predmetom, temami in načinom izvedbe.
- Ob potrditvi se status termina spremeni v "potrjen", študent pa dobi obvestilo v aplikaciji.
- Ob zavrnitvi se termin sprosti in ponovno postane viden kot prost, študent pa dobi obvestilo o zavrnitvi.
- Tutor ne more potrditi dveh različnih zahtev za isti termin.

## US-06
**Povezana funkcionalnost:** 4 - Odpoved potrjenega termina z rokom

**Uporabniška vloga:** Študent

**User story:** Kot študent želim odpovedati potrjen termin, da sprostim mesto, če ne morem priti.

**Acceptance criteria:**
- Če študent odpove termin 24 ur ali več pred začetkom, se odpoved zabeleži kot pravočasna.
- Če študent odpove termin manj kot 24 ur pred začetkom, se odpoved zabeleži kot pozna.
- Po odpovedi se termin sprosti in postane ponovno viden kot prost.
- Tutor ob odpovedi dobi obvestilo v aplikaciji.

## US-07
**Povezana funkcionalnost:** 5 - Priprava na srečanje

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim pred srečanjem videti predmet, teme in zapiske s prejšnjih srečanj z istim študentom, da se lahko ustrezno pripravim.

**Acceptance criteria:**
- Ob odprtju potrjenega termina tutor vidi izbran predmet in vpisane teme.
- Tutor vidi seznam vseh prejšnjih zapiskov za tega študenta, razvrščenih od najnovejšega.
- Če prejšnjih zapiskov ni, sistem prikaže sporočilo "ni prejšnjih zapiskov".
- Podatki o pripravi so vidni samo tutorju tega termina, ne drugim tutorjem.

## US-08
**Povezana funkcionalnost:** 6 - Zapisek po srečanju

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim po srečanju zapisati, kako se študent najbolje uči, kaj mu pomaga in na čem je treba delati naslednjič, da se naslednjič lahko bolje pripravim.

**Acceptance criteria:**
- Zapisek je mogoče dodati šele po tem, ko je termin minil.
- Zapisek lahko vidita samo tutor, ki ga je napisal, in koordinator.
- Zapisek je shranjen z datumom in časom nastanka.
- Tutor lahko zapisek kasneje uredi, zgodovina sprememb ni obvezna.

## US-09
**Povezana funkcionalnost:** 8 - Označba neprihoda

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim označiti, da se študent ni pojavil na terminu, da imam zabeleženo, kaj se je dejansko zgodilo.

**Acceptance criteria:**
- Tutor lahko termin označi kot "ni se pojavil" šele po tem, ko je čas termina minil.
- Po označitvi se status termina spremeni in ostane viden v zgodovini terminov.
- Koordinator lahko v pregledu vidi, kateri termini so bili označeni kot neprihod.

## US-10
**Povezana funkcionalnost:** 9 - Odpoved termina s strani tutorja

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim odpovedati potrjen termin, če ga ne morem izvesti, da se študent pravočasno obvesti.

**Acceptance criteria:**
- Po odpovedi tutorja študent takoj dobi obvestilo v aplikaciji.
- Termin se po odpovedi sprosti in je ponovno viden kot prost za druge študente.
- Odpoved s strani tutorja se v sistemu beleži ločeno od odpovedi s strani študenta.

## US-11
**Povezana funkcionalnost:** 10 - Ponavljajoči se termini

**Uporabniška vloga:** Tutor

**User story:** Kot tutor želim označiti tedensko ponavljajočo se dostopnost, da mi ni treba vsak teden ročno dodajati istih terminov.

**Acceptance criteria:**
- Tutor lahko izbere dan v tednu, uro ter število tednov ponavljanja.
- Sistem samodejno ustvari dostopnost za vse izbrane tedne.
- Če se katera od generiranih dostopnosti prekriva z že obstoječo, sistem to dostopnost izpusti in o tem obvesti tutorja.
- Tutor lahko prekliče celotno serijo ali samo posamezen termin znotraj serije.

## US-12
**Povezana funkcionalnost:** 11 - Evidenca opravljenih ur

**Uporabniška vloga:** Koordinator

**User story:** Kot koordinator želim videti, koliko ur je posamezen tutor opravil po predmetih, da imam pregled nad delovanjem tutorstva.

**Acceptance criteria:**
- Koordinator lahko filtrira evidenco po tutorju, predmetu in časovnem obdobju.
- Evidenca upošteva samo termine s statusom "izveden" (ne "ni se pojavil" ali "odpovedan").
- Vsota ur je prikazana skupno in po posameznem predmetu.

## US-13
**Povezana funkcionalnost:** vloga koordinatorja (upravljanje tutorjev)

**Uporabniška vloga:** Koordinator

**User story:** Kot koordinator želim dodati novega tutorja v sistem, da lahko ta začne ponujati tutorske ure.

**Acceptance criteria:**
- Koordinator vnese ime, priimek in fakultetno e-pošto novega tutorja.
- Sistem novemu tutorju samodejno dodeli vlogo "tutor".
- Koordinator določi, katere predmete bo tutor predajal.
- Dodan tutor se takoj pojavi na seznamu tutorjev, vidnem študentom.

## US-14
**Povezana funkcionalnost:** vloga koordinatorja (upravljanje predmetov)

**Uporabniška vloga:** Koordinator

**User story:** Kot koordinator želim urejati seznam predmetov v sistemu, da je seznam vedno ažuren.

**Acceptance criteria:**
- Koordinator lahko doda nov predmet z nazivom.
- Koordinator lahko odstrani predmet, če zanj ni aktivnih terminov.
- Če ima predmet aktivne termine, sistem odstranitev prepreči in prikaže razlog.
- Spremembe seznama predmetov so takoj vidne pri izbiri predmeta ob pošiljanju zahteve.

## US-15
**Povezana funkcionalnost:** vloga koordinatorja (pregled nad sistemom)

**Uporabniška vloga:** Koordinator

**User story:** Kot koordinator želim imeti pregled nad vsemi tutorji, študenti in termini, da lahko po potrebi posredujem ali popravim napako.

**Acceptance criteria:**
- Koordinator vidi seznam vseh terminov v sistemu, ne glede na tutorja ali študenta.
- Koordinator lahko odpove ali popravi kateri koli termin.
- Koordinator lahko prebere zapiske katerega koli tutorja.
- Koordinator ne more potrditi ali zavrniti zahteve namesto tutorja.