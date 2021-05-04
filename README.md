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

## 1. LP
Osnutek aplikacije in wireframe model

### [EventDetails.html](app_server/views/EventDetails.html)
- Vidna je omejitev števila obiskovalcev, lahko se tudi prijaviš
- Ogledaš si lahko podrobnosti dogodka
- Kraj dogodka je prikazan na zemljevidu
- Vidna je tudi vremenska napoved na kraju dogodka

### [EventRating.html](app_server/views/EventRating.html)
- Na vrhu strani je vidna povprečna ocena obiskovalcev
- Možno je tudi oddati svoje mnenje o dogodku in branje mnenja ostalih

### [Registracija.html](app_server/views/registracija.hbs)
- omogoča registracijo novega računa, kjer imata vnos emaila in passworda vnaprej določene specifikacije
- oseba se mora strinjati z splošnimi pogoji registracije preden lahko nadaljuje
- če oseba že ima račun gre lahko direktno na obrazec za prijavo

### [Prijava.html](app_server/views/prijava.hbs)
- omogoča prijavo v stran če oseba že ima račun
- lahko a tudi nadaljuje brez vpisa

### [Pozabljenogeslo.html](app_server/views/pozabljenogeslo.hbs)
- obrazec za pozabljeno geslo kjer lahko uporabnik z vpisom maila
- na ta mail dobi link za ponastavitev gesla.

### [Splosnipogoji.html](app_server/views/Login/splosnipogoji.hbs)
- uporabnik se more pred registracijo strinjati z splosnimi pogoji uporabe

### [Home.html](app_server/views/home.hbs)
- Prikazuje vse prihajujoče dogodke
- ob kliku na dogodek te preusmeri na podrobnosti kliknenega dogodka
- tabela omogoča filtriranje po različnih stolpcih

### [EventArchive.html](app_server/views/EventArchive.html)
- Prikazuje vse pretekle dogodke
- ob kliku na dogodek te preusmeri na podrobnosti z oceno dogodka

### [MyEvents.html](app_server/views/MyEvents.html)
- Uporabnik vidi vse dogodke na katere je prijavljen ter ustvarjene dogodke
- Od prijavljenih dogodkov se lahko odjavi
- Ustvarjene dogodke lahko ureja ali jih izbriše

### [EditEvent.html](app_server/views/EventWizard/EditEvent.html)
- Uporabnik uredi svoj dogodek

### [AddEvent.html](app_server/views/EventWizard/AddEvent.html)
- Uporabnik doda nov dogodek in vpiše vse podatke

### Razlike med brskalniki:
- V Chromu in Edgu se datum da izbirati, v Firefoxu pa ga je potrebno napisati na roke

### Uporabljeni zunanji viri:
- Kot zunanji vir smo uporabili API za napovedovanje vremena, dostopen je na naslovu https://openweathermap.org/forecast5
- Za delovanje knjiznice node-geocoder smo uporabili se API na naslovu: https://opencagedata.com/

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika

### Dovoljeni vnosi:

#### Registracija

- Elektronski naslov:(String) mora biti oblike "email"
- Uporabnisko ime:(String) vsebuje samo črke in številke
- Geslo:(String) dolžine vsaj 8 in mora vsebovati vsaj 1 številko,veliko/malo črko in 1 znak.

### Prijava

- Elektronski naslov:(String) mora biti oblike "email"
- Geslo:(String) dolžine vsaj 8 in mora vsebovati vsaj 1 številko,veliko/malo črko in 1 znak.

### Dodajanje novega dogodka/ urejanje dogodka

- Ime dogodka:(String)
- Naslov dogodka:(String)
- Najblijžje večje mesto:(String)
- Organizator dogodka:(String)
- Tip dogodka:uporabnik mora izbrati izmed 3 vnaprej nastavljenih možnosti(radio)
- Prireditveni prostor:uporabnik mora izbrati izmed 3 vnaprej nastavljenih možnosti(radio)
- Čas dogodka:(String) izbran more biti datum in čas, ki ni v preteklosti
- Cena dogodka:(Integer)
- Dovoljeno število prisotrnih:Integer
- Opis dogodka:(String) dolžine vsaj 50 znakov

## Naprave na katerih deluje spletna stran:
Spletna stran deluje na racunalniku, iPhone5/SE in iPad

### Uporabljene npmjs knjiznice
- https://www.npmjs.com/package/node-geocoder
- https://www.npmjs.com/package/node-cmd
- https://momentjs.com/
- https://www.npmjs.com/package/nodemailer

## 3. LP
Dinamična spletna aplikacija s podatkovno bazo

### Link do spletne aplikacije na Heroku
- https://slogodki.herokuapp.com/

### Navodila za namestitev in zagon aplikacije
- docker-compose up --no-start --build
- docker start sp-slogodki-mongodb
- npm install
- (ce je potrebno)npm audit fix
- nodemon
- localhost:3000 v webbrowserju
- localhost:3000/db 
- Kreiraj da uvoziš podatke v bazo

## 4. LP
SPA aplikacija na eni strani

## 5. LP
Varnostno zaščitena progresivna aplikacija
