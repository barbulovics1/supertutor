# Dodana tabela obvestilo za obveščanje uporabnikov

## Status
Sprejeto

## Kontekst in problem
Pri implementaciji funkcionalnosti odpovedi termina (US-06) sem potreboval način, da tutor izve, da je študent odpovedal termin. Podatkovni model iz naloge 1 (docs/03-podatkovni-model.md) tega ni predvidel, saj takrat obveščanje še ni bilo podrobneje razdelano.

## Obravnavane alternative
- Shranjevanje obvestil v bazo (nova tabela)
- Obvestilo samo v seji (brez shranjevanja v bazo)

## Sprejeta odločitev
Odločil sem se za novo tabelo `obvestilo` v bazi. Obvestilo mora počakati do naslednje prijave tutorja, saj ni nujno, da je tutor prijavljen v istem trenutku, ko študent odpove termin - obvestilo v seji bi se v tem primeru izgubilo.

## Posledice

### Pozitivne
- Obvestila se ne izgubijo, tudi če tutor ni prijavljen v trenutku odpovedi.
- Enostavno je dodati obveščanje tudi za druge dogodke (npr. potrditev zahteve) v prihodnje.

### Negativne
- Podatkovni model iz naloge 1 ni več povsem skladen z dejansko implementacijo - tabela obvestilo tam ni omenjena.