# Izbira SQLite za podatkovno bazo

## Status
Sprejeto

## Kontekst in problem
Za projekt sem potreboval podatkovno bazo, v katero se bodo shranjevali uporabniki, predmeti, termini in zapiski. Ker delam sam in razvijam na svojem računalniku, sem potreboval bazo, ki jo je enostavno vzpostaviti, brez dodatne infrastrukture.

## Obravnavane alternative
- SQLite
- PostgreSQL
- MySQL

## Sprejeta odločitev
Odločil sem se za SQLite. Cela baza je ena sama datoteka znotraj projekta, zato mi ni treba nameščati in nastavljati ločenega strežnika baze, uporabniških imen ali gesel zanj. V tej fazi razvoja mi to precej olajša delo, saj se lahko osredotočim na pisanje aplikacije namesto na nastavljanje infrastrukture.

## Posledice

### Pozitivne
- Nič posebnega ni treba nastavljati - baza je pripravljena takoj.
- Projekt je enostavno prenesti med računalniki, saj je baza kar del projektne mape.
- Ni ločenega strežnika baze, za katerega bi moral skrbeti ali ga posodabljati.

### Negativne
- SQLite slabše prenese veliko število uporabnikov, ki bi hkrati brali in pisali v bazo, kar bi lahko postalo težava, če bi aplikacijo kdaj javno objavil.
- Če bi projekt zrasel, bi verjetno moral preiti na zmogljivejšo bazo, kot je PostgreSQL, kar pomeni dodatno delo.