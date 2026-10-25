# Shranjevanje gesel z bcrypt

## Status
Sprejeto

## Kontekst in problem
Gesla uporabnikov se ne smejo nikoli shraniti v bazo kot čisto besedilo, saj bi ob morebitnem uhajanju podatkov kdorkoli videl vsa gesla. Moral sem se odločiti, kako bom gesla varno shranil.

## Obravnavane alternative
- Shranjevanje gesla kot čisto besedilo (brez zaščite)
- bcrypt
- Enostavno zgoščevanje (npr. SHA-256 brez dodatne zaščite)

## Sprejeta odločitev
Odločil sem se za bcrypt. Gre za standarden in preizkušen način zgoščevanja gesel, ki je narejen posebej za to - vsebuje tudi mehanizem, ki oteži hitro preizkušanje velikega števila gesel (t. i. "salt" in počasnost algoritma), kar navadno zgoščevanje (npr. samo SHA-256) ne ponuja.

## Posledice

### Pozitivne
- Gesla nikoli niso vidna v čistem besedilu, niti meni kot razvijalcu.
- bcrypt je pogosto uporabljen v Node.js projektih, zato je enostavno najti primere in pomoč.

### Negativne
- Zgoščevanje z bcrypt je nekoliko počasnejše od enostavnejših metod, kar pa pri majhnem številu uporabnikov ni opazno.
- Če bi geslo pozabil, ga ni mogoče "povrniti" - edina možnost je nastavitev novega gesla, kar pa je pri tovrstnih sistemih tako ali tako pričakovano in pravilno obnašanje.