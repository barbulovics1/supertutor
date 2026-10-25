# Smeri študija kot seznam v kodi, ne posebna entiteta v bazi

## Status
Sprejeto

## Kontekst in problem
Pri registraciji mora študent izbrati svojo smer študija. Moral sem se odločiti, ali bodo smeri shranjene kot posebna tabela v bazi (ki bi jo lahko urejal koordinator), ali preprosto kot seznam, zapisan kar v kodi.

## Obravnavane alternative
- Posebna entiteta/tabela "Smer" v bazi, ki bi jo lahko urejal koordinator
- Seznam smeri, zapisan neposredno v kodi (brez posebne tabele)

## Sprejeta odločitev
Odločil sem se za seznam v kodi. Smeri študija na fakulteti se ne spreminjajo pogosto, zato se mi ni zdelo smiselno dodajati posebno tabelo in vmesnik za njeno urejanje samo zaradi nekaj redkih sprememb na leto. Tak pristop mi je omogočil, da se v tej fazi osredotočim na pomembnejše dele aplikacije.

## Posledice

### Pozitivne
- Enostavnejši podatkovni model - ena entiteta manj.
- Ni potrebe po dodatnem vmesniku za urejanje smeri.

### Negativne
- Če bi se seznam smeri kdaj spremenil, bi bilo treba spremeniti kodo in ponovno zagnati aplikacijo, namesto da bi to naredil kar koordinator prek vmesnika.
- Če bi se pozneje izkazalo, da se smeri vendarle pogosto spreminjajo, bi bil potreben dodaten razvoj za prehod na tabelo v bazi.