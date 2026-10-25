# Avtentikacija prek sej namesto JWT

## Status
Sprejeto

## Kontekst in problem
Aplikacija mora vedeti, kdo je prijavljen, in ločiti med vlogami (študent, tutor, koordinator) pri vsaki naslednji zahtevi. Moral sem se odločiti, kako bom to rešil.

## Obravnavane alternative
- Seje (express-session)
- JWT (JSON Web Token)

## Sprejeta odločitev
Odločil sem se za seje, prek knjižnice express-session. Zdele so se mi enostavnejše za razumeti in vzpostaviti kot JWT. Poleg tega gre za spletno aplikacijo, ki (vsaj za zdaj) ne potrebuje ločenega mobilnega API-ja, za katerega bi bil JWT bolj smiseln.

## Posledice

### Pozitivne
- Lažje mi je bilo razumeti, kako prijava sploh deluje, saj so seje precej enostavnejše od JWT.
- Strežnik ima nad sejo poln nadzor - če bi bilo treba, jo lahko kadarkoli prekliče.

### Negativne
- Seje zahtevajo, da strežnik ves čas hrani podatek o tem, kdo je prijavljen, kar bi bilo pri morebitnem skaliranju na več strežnikov bolj zapleteno kot pri JWT.
- Če bi kdaj naredil mobilno aplikacijo, bi verjetno potreboval drugačno rešitev za avtentikacijo.