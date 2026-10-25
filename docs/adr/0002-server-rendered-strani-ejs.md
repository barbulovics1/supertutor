# Strežniško generiranje strani (EJS) namesto ločenega API-ja

## Status
Sprejeto

## Kontekst in problem
Moral sem se odločiti, kako bo backend komuniciral s frontendom - ali prek ločenega API-ja, ki vrača podatke, frontend pa jih sam prikaže (npr. z React-om), ali tako, da strežnik sam sestavi celotno HTML stran in jo pošlje brskalniku.

## Obravnavane alternative
- Ločen REST API (Express) + frontend ogrodje (React ali podobno)
- Strežniško generiranje strani s predlogami (EJS)

## Sprejeta odločitev
Odločil sem se za strežniško generiranje strani z EJS. Za prvo delujočo različico se mi je zdelo enostavneje, da ne razvijam dveh ločenih projektov hkrati (API in frontend aplikacijo), in da se mi ni treba ukvarjati s stvarmi, kot sta stanje na frontendu ali CORS, česar v tej fazi še ne obvladam dovolj dobro.

## Posledice

### Pozitivne
- Enostavnejša struktura projekta, primerna za to, da ga delam sam.
- Manj konceptov, ki jih moram usvojiti v prvi fazi.
- Hitrejši razvoj osnovnih funkcionalnosti, saj mi ni treba pisati ločenih API klicev za vsak prikaz podatkov.

### Negativne
- Če bi kasneje želel narediti mobilno aplikacijo ali bolj interaktiven vmesnik, bi moral dodatno delati na ločenem API-ju.
- Manj fleksibilnosti pri morebitnih naprednejših uporabniških vmesnikih, kot bi jih omogočalo ogrodje, kot je React.