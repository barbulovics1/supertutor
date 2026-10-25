# SuperTutor

SuperTutor je spletna aplikacija za organizacijo tutorskih ur na Fakulteti za elektrotehniko, računalništvo in informatiko (FERI).

## Problem
Tutorstvo na FERI trenutno poteka skoraj izključno prek sporočil (WhatsApp, Messenger, Discord,..). Tutorji imajo vsak svoj urnik, zato nikoli ni čisto jasno, kdaj so dejansko prosti. Da se dogovoriš za termin, pogosto rabiš več sporočil sem in tja, termin se včasih zgreši ali kar pozabi, včasih pa se izkaže, da je tutor isti termin že dal nekomu drugemu.

Poleg tega se tutor na samo uro ne more dobro pripraviti, ker pred srecanjem sploh ne ve, s čim bo študent rabil pomoč oziroma kaj so se na prejšnjih urah že delali.

Primer: tutor ima predavanja ob torkih do 16. ure, študent pa je prost šele po 18. uri. Dogovarjanje traja več dni, na koncu pa se izkaže, da je termin že zaseden.

## Namen rešitve
Tutor v aplikaciji označi, kdaj je na voljo. Študent izbere prost termin in pošlje zahtevo, pri čemer navede predmet, teme s katerimi rabi pomoč, in ali bo srečanje v živo ali online. Tutor zahtevo potrdi ali zavrne. Ker študent vnaprej napiše, kaj ga zanima, se tutor lahko pripravi - pomagajo mu tudi zapiski iz prejšnjih srečanj z istim študentom. Po uri tutor zapiše, kako se študent najbolje uči in kaj mu pomaga.

## Ciljni uporabniki
- Študenti vseh letnikov in smeri na FERI, ki rabijo pomoč pri predmetih.
- Tutorji - študenti, ki tutorstvo opravljajo prostovoljno, v svojem prostem času.
- Koordinator (admin), ki skrbi za delovanje sistema in ima pregled nad vsem dogajanjem.

## Kratek opis delovanja
Študent se registrira s fakultetnim e-poštnim naslovom. Tutorje v sistem doda koordinator, ker mora biti tutor dejansko študent, ki tutorstvo izvaja - se torej ne more kar sam registrirati kot tutor.

Tutor v koledarju označi, kdaj ima čas. Študent nato vidi proste termine svojih tutorjev in enega izbere. Ob tem izbere predmet, napiše teme s katerimi rabi pomoč, in izbere, ali gre za srečanje v živo (vpiše lokacijo) ali online (vpiše kontakt, recimo Discord username). Tutor pred uro lahko pogleda vse to, pa tudi zapiske iz prejšnjih srečanj s tem študentom, nato zahtevo potrdi ali zavrne. Študent o odločitvi dobi obvestilo v aplikaciji.

Termin lahko študent odpove, vendar najkasneje 24 ur prej - če odpove kasneje, se to zabeleži kot pozna odpoved. Tudi tutor lahko odpove potrjen termin, takrat se študentu pošlje obvestilo, termin pa postane spet prost.

Po srečanju tutor označi, ali se je študent sploh prikazal (če ne, se to zabeleži kot "ni se pojavil"), in napiše zapisek o tem, kako se študent najbolje uči. Zapiske lahko vidita tutor in koordinator.