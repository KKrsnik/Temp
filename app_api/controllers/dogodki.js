const mongoose = require('mongoose');
const Dogodek = mongoose.model('Dogodek');
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'opencage',
    apiKey: '598c97e958ab410abe126ee35ac3c995',
    formatter: null
};

const geocoder = NodeGeocoder(options);

var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://slogodki.herokuapp.com/';
}
const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});

const dogodkiSeznam = (req, res) => {
    Dogodek
        .find()
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json(napaka);
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(dogodek);
        });
};

const getDogodkiSeznam = (req, res) => {
    axios
        .get('api/dogodki')
        .then((odgovor) => {
            date = new Date();
            date = date.toISOString();
            odgovor = odgovor.data;
            for(var i = 0; i < odgovor.length; i++) {
                d1 = odgovor[i].datum
                if(d1 <= date) {
                    delete odgovor[i];
                }
            }
            dogodkiSeznamPrikaz(req, res, odgovor)
        })
        .catch(() => {
            dogodkiSeznamPrikaz(req, res, [], "Napaka API-ja pri iskanju dogodka.");
        });
}

const dogodkiSeznamPrikaz = (req, res, dogodki, sporocilo) => {
    res.render('Home', {
        title: 'Seznam dogodkov',
        dogodki,
        sporocilo: sporocilo
    });
}


const dogodekKreiraj = (req, res) => {
    Dogodek.create({
        title: req.body.title,
        ime_dogodka: req.body.ime_dogodka,
        mesto: req.body.mesto,
        naslov: req.body.naslov,
        prostor: req.body.prostor,
        organizator: req.body.organizator,
        tip: req.body.tip,
        max_ljudi: req.body.max_ljudi,
        kreator: req.body.kreator,
        prijavljeni: req.body.prijavljeni,
        datum: req.body.datum,
        ura: req.body.ura,
        vreme: req.body.vreme,
        cena: req.body.cena,
        opis: req.body.opis,
        komentarji: req.body.komentarji,
        koordinate: [
            parseFloat(req.body.lat),
            parseFloat(req.body.lng)
        ]
    }, (napaka, dogodek) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(dogodek);
        }
    });
};

const dogodkiPreberiIzbrano = (req, res) => {
    Dogodek
        .findById(req.params.idDogodka)
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem dogodka s podanim enoličnim identifikatorjem idDogodka."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(dogodek);
        });
};

const dogodkiPosodobiIzbrano = (req, res) => {
    if (!req.params.idDogodka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
    Dogodek
        .findById(req.params.idDogodka)
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            dogodek.title = req.body.title;
            dogodek.ime_dogodka = req.body.ime_dogodka;
            dogodek.mesto = req.body.mesto;
            dogodek.naslov = req.body.naslov;
            dogodek.prostor = req.body.prostor;
            dogodek.organizator = req.body.organizator;
            dogodek.tip = req.body.tip;
            dogodek.max_ljudi = parseInt(req.body.max_ljudi);
            dogodek.datum = req.body.datum;
            dogodek.ura = req.body.ura;
            dogodek.vreme = req.body.vreme;
            dogodek.cena = parseInt(req.body.cena);
            dogodek.opis = req.body.opis;

            dogodek.save((napaka, dogodek) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.status(200).json(dogodek);
                }
            });
        });
};

const dogodkiIzbrisiIzbrano = (req, res) => {
    const {idDogodka} = req.params;
    if (idDogodka) {
        Dogodek
            .findByIdAndRemove(idDogodka)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
};

const urediDogodek = (req, res) => {
    axios
        .get('api/dogodki/' + req.params.idDogodka)
        .then((odgovor) => {
            urediDogodekPrikaz(req, res, odgovor.data);
        })
        .catch(() => {
            urediDogodekPrikaz(req, res, [], "Napaka API-ja pri iskanju dogodka.");
        });
    ;
}

const urediDogodekPrikaz = (req, res, dogodek, sporocilo) => {
    res.render('EventWizard/EditEvent', {
        title: 'Urejanje dogodka',
        dogodek,
        sporocilo: sporocilo
    });
}

const dodajDogodek = (req, res) => {
    prikaziObrazecZaDogodek(req, res);
}

const prikaziObrazecZaDogodek = (req, res) => {
    res.render('EventWizard/AddEvent', {
        title: 'Nov Dogodek'
    })
}

async function getgeo(naslov) {
    const geodata = await geocoder.geocode(naslov);
    return geodata;
}

const shraniDogodek = async (req, res) => {
    var lati = 0;
    var longi = 0;
    var cena = 0;
    if(req.body.prostor != "online") {
        req.body.mesto = " " + req.body.mesto;
        const geodata = await getgeo(req.body.naslov.concat(req.body.mesto)).catch(null);
        lati = geodata[0].latitude;
        longi = geodata[0].longitude;
    }
    if(req.body.tip != "free") {
        cena = req.body.cena;
    }
    axios({
        method: 'post',
        url: '/api/dogodki',
        data: {
            lat: lati,
            lng: longi,
            title: req.body.title,
            ime_dogodka: req.body.ime_dogodka,
            mesto: req.body.mesto,
            naslov: req.body.naslov,
            prostor: req.body.prostor,
            organizator: req.body.organizator,
            tip: req.body.tip,
            max_ljudi: req.body.max_ljudi,
            kreator: req.body.kreator,
            prijavljeni: req.body.prijavljeni,
            datum: req.body.datum,
            ura: req.body.ura,
            vreme: req.body.vreme,
            cena: cena,
            opis: req.body.opis,
            komentarji: req.body.komentarji,
        }
    }).then(() => {
        res.redirect('/myEvents');
    }).catch((napaka) => {
        console.log(napaka);
    });
}

const odjavi = (req, res) => {
    if (!req.params.idDogodka) {
        return res.status(404).json("ne");
    }
    Dogodek
        .findById(req.params.idDogodka)
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            dogodek.prijavljeni -= 1;

            dogodek.save((napaka, dogodek) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.redirect('/myEvents');
                }
            });
        });
};

const prijavi = (req, res) => {
    console.log("HERE");
    if (!req.params.idDogodka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
    Dogodek
        .findById(req.params.idDogodka)
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            dogodek.prijavljeni += 1;

            dogodek.save((napaka, dogodek) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.redirect('/eventDetails/' + req.params.idDogodka);
                }
            });
        });
};

const izbrisi = (req, res) => {
    const idDogodka = req.params.idDogodka;
    if (idDogodka) {
        Dogodek
            .findByIdAndRemove(idDogodka)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.redirect('/myEvents');
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
}

const posodobiDogodek = async (req, res) => {
    if (!req.params.idDogodka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
    var lati = 0;
    var longi = 0;
    if(req.body.prostor != "online") {
        req.body.mesto = " " + req.body.mesto;
        const geodata = await getgeo(req.body.naslov.concat(req.body.mesto)).catch(null);
        lati = geodata[0].latitude;
        longi = geodata[0].longitude;
    }
    Dogodek
        .findById(req.params.idDogodka)
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            dogodek.title = req.body.title;
            dogodek.ime_dogodka = req.body.ime_dogodka;
            dogodek.mesto = req.body.mesto;
            dogodek.naslov = req.body.naslov;
            dogodek.prostor = req.body.prostor;
            dogodek.organizator = req.body.organizator;
            dogodek.tip = req.body.tip;
            dogodek.max_ljudi = parseInt(req.body.max_ljudi);
            dogodek.datum = req.body.datum;
            dogodek.ura = req.body.ura;
            dogodek.vreme = req.body.vreme;
            dogodek.cena = parseInt(req.body.cena);
            dogodek.opis = req.body.opis;
            dogodek.lokacija = [
                lati,
                longi
            ]

            dogodek.save((napaka, dogodek) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.redirect('/myEvents');
                }
            });
        });
};

module.exports = {
    dogodkiSeznam,
    getDogodkiSeznam,
    dogodekKreiraj,
    dogodkiPreberiIzbrano,
    dogodkiPosodobiIzbrano,
    dogodkiIzbrisiIzbrano,
    urediDogodek,
    dodajDogodek,
    shraniDogodek,
    odjavi,
    prijavi,
    izbrisi,
    posodobiDogodek,
};
