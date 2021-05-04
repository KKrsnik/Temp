var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://slogodki.herokuapp.com/';
}

var cmd = require('node-cmd');

const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});

const db = (req, res) => {
    res.render('db');
}

const init = (req, res) => {

    cmd.run('npm run dogodki-init');
    cmd.run('npm run dogodki-init-uporabnik');
    res.redirect('/db');
}

const brisi = (req, res) => {
    cmd.run('npm run dogodki-zbrisi');
    cmd.run('npm run dogodki-zbrisi-uporabnik');
    res.redirect('/db')
}

/* GET home page */
const home = (req, res) => {
    res.render('Home', [{
        title: 'Podrobnosti dogodka',
        ime_dogodka: 'Miti in resnice o odnosih',
        max_ljudi: 50,
        prijavljeni: 45,
        datum: '10.11.',
        ura: '18:00',
        vreme: 'Delno oblačno',
        organizator: 'Izidor Gašperlin',
        lokacija: 'Narodni dom Maribor, Maribor',
        koordinate: {
            lat: 46.557464,
            lng: 15.649218
        },
        cena: '100',
        opis: 'Večer v živo: slišali bomo veliko koristnih resnic in zmot o odnosih in o tem, kako ti ustvarjajo našo\n' +
            '                realnost.',
        dodatno: '<ul> ' +
            '<li>V primeru slabega vremena se bo dogodek prestavil na 17.11.2020 ob 18:00</li>' +
            '<li>Zaradi koronavirusa velja stroga omejitev na 50 obiskovalcev! Če si želite zagotoviti mesto, se čim prej prijavite.</li>' +
            '</ul>',
        slika: '<img src="/images/NarodniDom.png" class="img-fluid" alt="kraj dogodka">'


    }]);
};

const eventDetails = (req, res) => {
    axios
        .get('/api/dogodki/' + req.params.idDogodka)
        .then((odgovor) => {
            showEventDetails(req, res, odgovor.data);
        })
            .catch((napaka) => {
                    prikaziNapako(req, res, napaka);
            });
};

const showEventDetails = (req, res, dogodek) => {
    res.render('EventDetails', {
        title: "Podrobnosti dogodka",
        dogodek
    });
};

const eventRating = (req, res) => {
    axios
        .get('/api/dogodki/' + req.params.idDogodka)
        .then((odgovor) => {
            showEventRating(req, res, odgovor.data);
        })
            .catch((napaka) => {
                prikaziNapako(req, res, napaka);
            });
};

const showEventRating = (req, res, eventRating) => {
    res.render('eventRating', {
        _id: eventRating._id,
        title: eventRating.title,
        ime_dogodka: eventRating.ime_dogodka,
        ocena: eventRating.ocena,
        organizator: eventRating.organizator,
        mesto: eventRating.mesto,
        datum: eventRating.datum,
        ura: eventRating.ura,
        cena: eventRating.cena,
        opis: eventRating.opis,
        komentarji: eventRating.komentarji,
    });
};

const eventArchive = (req, res) => {
    axios
        .get('api/dogodki/')
        .then((odgovor) => {
            date = new Date();
            date = date.toISOString();
            odgovor = odgovor.data;
            for(var i = 0; i < odgovor.length; i++) {
                d1 = odgovor[i].datum
                if(d1 >= date) {
                    delete odgovor[i];
                }
            }
            eventArchiveShow(req, res, odgovor)
        })
        .catch(() => {
            eventArchiveShow(req, res, [], "Napaka API-ja pri iskanju dogodka.");
        });
};

const eventArchiveShow = (req, res, dogodki) => {
    res.render('EventArchive', {
        title: 'Arhiv dogodkov',
        dogodki
    });
};

const myEvents = (req, res) => {
    axios
        .get('/api/dogodki/')
        .then((odgovor) => {
            showMyEvents(req, res, odgovor.data);
        })
        .catch((napaka) => {
            prikaziNapako(req, res, napaka);
        });
};

const showMyEvents = (req, res, dogodki) => {
    res.render('myEvents', {
        title: 'Moji ogodki',
        dogodki
    })
}

const editEvent = (req, res) => {
    res.render('EventWizard/EditEvent', {
        title: 'Urejanje Dogodka',
        eventName: "Miti in resnice o odnosih",
        eventLocation: 'Narodni dom Maribor',
        eventCity: 'Maribor',
        eventOrganiser: 'Izidor Gašperlin',
        eventType: 'paid',
        eventPlace: 'outside',
        eventTime: '2020-12-10T18:00',
        eventPrice: '100',
        eventMaxParticipants: '50',
        eventTitle: 'Miti in resnice o odnosih',
        eventDescription: 'Večer v živo: slišali bomo veliko koristnih resnic in zmot o odnosih in o tem, kako ti ustvarjajo našo realnost.'
    });
};

const addEvent = (req, res) => {
    res.render('EventWizard/AddEvent', {title: 'Dodajanaje novega dogodka'});
};

const dodajKomentar = (req, res) => {
    eventRating(req, res);
};

const shraniKomentar = (req, res) => {
    const idDogodka = req.params.idDogodka;
    axios({
        method: 'post',
        url: '/api/dogodki/' + idDogodka + '/komentarji',
        data: {
            ime: req.body.ime,
            ocena: req.body.ocena,
            vsebina: req.body.tekst
        }
    }).then(() => {
        res.redirect('/dogodki/' + idDogodka);
    }).catch((napaka) => {
        prikaziNapako(req, res, napaka);
    });
};

const prikaziNapako = (req, res, napaka) => {
    let naslov = "Nekaj je šlo narobe!";
    let vsebina = napaka.isAxiosError ?
        "Napaka pri dostopu do oddaljenega vira preko REST API dostopa!" :
        undefined;
    vsebina = (
        vsebina != undefined &&
        napaka.response && napaka.response.data["sporočilo"]
    ) ? napaka.response.data["sporočilo"] : vsebina;
    vsebina = (
        vsebina != undefined &&
        napaka.response && napaka.response.data["message"]
    ) ? napaka.response.data["message"] : vsebina;
    vsebina = (vsebina == undefined) ?
        "Nekaj nekje očitno ne deluje." : vsebina;
    res.render('napaka', {
        title: naslov,
        vsebina: vsebina
    });
};

module.exports = {
    brisi,
    init,
    db,
    home,
    eventDetails,
    eventRating,
    eventArchive,
    myEvents,
    editEvent,
    addEvent,
    shraniKomentar,
    dodajKomentar
};