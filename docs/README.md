# Spletno programiranje 2020/2021

Dokumentacija lastnega projekta pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

Spletna aplikacija omogoča objavo, prijavo in pregled dogodkov:
- prijava/registracija uporabnikov
- dostop do pregleda dogodkov in detailov kot neprijavljen uporabnik
- prijavljen porabnik lahko dodaja dogodke in svoje dogodke ureja/briše, ter se prijavlja na druge dogodke
- pretekle dogodke lahko uporabniki ki so bili na njih prijavljeni ocenjujejo in oddajo komentarje
- tabela vseh dogodkov, s filtrom(prihodnji dogodki, pretekli, zastonj dogodki, cena dogodkov) in sortiranjem, iskalnik dogodkov
- ko odpres dogodek dobis detaile (kraj, čas, zemljevid kraja dogodka, opis dogodka) in možnost prijave na dogodek
- email nekaj dni pred dogodkom na katerega si se prijavil
slogodki
- V primeru slabega vremena avtomatsko pošljemo email organizatorju o nadaljnih akcijah(prestavitev lokacije ali časa, odpoved dogodka)
- Prijavljeni so avtomatko obveščeni o vseh spremembah

- Zunanji vir: zemljevid z lokacijo dogodka in vremenska napoved za prostor in čas dogodka

## 1. LP
Osnutek aplikacije in wireframe modelasd test

### EventDetails.html
- Vidna je omejitev števila obiskovalcev, lahko se tudi prijaviš
- Ogledaš si lahko podrobnosti dogodka
- Kraj dogodka je prikazan na zemljevidu
- Vidna je tudi vremenska napoved na kraju dogodka

### EventRating.html
- Na vrhu strani je vidna povprečna ocena obiskovalcev
- Možno je tudi oddati svoje mnenje o dogodku in branje mnenja ostalih

### Registracija.html
- omogoča registracijo novega računa, kjer imata vnos emaila in passworda vnaprej določene specifikacije
- oseba se mora strinjati z splošnimi pogoji registracije preden lahko nadaljuje
- če oseba že ima račun gre lahko direktno na obrazec za prijavo

### Prijava.html
- omogoča prijavo v stran če oseba že ima račun
- lahko a tudi nadaljuje brez vpisa

### Pozabljenogeslo.html
- obrazec za pozabljeno geslo kjer lahko uporabnik z vpisom maila
- na ta mail dobi link za ponastavitev gesla.

### Splosnipogoji.html
- uporabnik se more pred registracijo strinjati z splosnimi pogoji uporabe

### Home.html

- Prikazuje vse prihajujoče dogodke
- ob kliku na dogodek te preusmeri na podrobnosti kliknenega dogodka
- tabela omogoča filtriranje po različnih stolpcih

### EventArchive.html

- Prikazuje vse pretekle dogodke
- ob kliku na dogodek te preusmeri na podrobnosti z oceno dogodka

### MyEvents.html
- Uporabnik vidi vse dogodke na katere je prijavljen ter ustvarjene dogodke
- Od prijavljenih dogodkov se lahko odjavi
- Ustvarjene dogodke lahko ureja ali jih izbriše

### EditEvent.html
- Uporabnik uredi svoj dogodek

### AddEvent.html
- Uporabnik doda nov dogodek in vpiše vse podatke

## 2. LP
Dinamična spletna aplikacija z logiko na strani strežnika

## 3. LP
Dinamična spletna aplikacija s podatkovno bazo

## 4. LP
SPA aplikacija na eni strani

## 5. LP
Varnostno zaščitena progresivna aplikacija
