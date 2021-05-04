const mongoose = require('mongoose');
const Dogodek = mongoose.model('Dogodek');

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

const komentarjiKreiraj = (req, res) => {
    const idDogodka = req.params.idDogodka;
    if (idDogodka) {
        Dogodek
            .findById(idDogodka)
            .select('komentarji')
            .exec((napaka, dogodek) => {
                if (napaka) {
                    console.log(napaka);
                    res.status(400).json(napaka);
                } else {
                    dodajKomentar(req, res, dogodek, req.body);
                }
            });
    } else {
        res.status(400).json({
            "sporočilo":
                "Ne najdem dogodka, idDogodka je obvezen parameter."
        });
    }
};

const komentarjiPreberiIzbranega = (req, res) => {
    Dogodek
        .findById(req.params.idDogodka)
        .select('ime_dogodka komentarji')
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem dogodka s podanim enoličnim identifikatorjem idDogodka."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (dogodek.komentarji && dogodek.komentarji.length > 0) {
                const komentar = dogodek.komentarji.id(req.params.idKomentarja);
                if (!komentar) {
                    return res.status(404).json({
                        "sporočilo":
                            "Ne najdem komentarja s podanim enoličnim identifikatorjem idKomentarja."
                    });
                } else {
                    res.status(200).json({
                        "dogodek": {
                            ime_dogodka: dogodek.ime_dogodka,
                            id: req.params.idDogodka
                        },
                        "komentar": komentar
                    });
                }
            } else {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem nobenega komentarja."
                });
            }
        });
};

const komentarjiPosodobiIzbranega = (req, res) => {
    if (!req.params.idDogodka || !req.params.idKomentarja) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka oz. komentarja, " +
                "idDogodka in idKomentarja sta obvezna parametra."
        });
    }
    Dogodek
        .findById(req.params.idDogodka)
        .select('komentarji')
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (dogodek.komentarji && dogodek.komentarji.length > 0) {
                const trenutniKomentar = dogodek.komentarji.id(req.params.idKomentarja);
                if (!trenutniKomentar) {
                    res.status(404).json({"sporočilo": "Ne najdem komentarja."});
                } else {
                    trenutniKomentar.ime = req.body.ime;
                    trenutniKomentar.ocena = req.body.ocena;
                    trenutniKomentar.vsebina = req.body.komentar;
                    dogodek.save((napaka, dogodek) => {
                        if (napaka) {
                            res.status(404).json(napaka);
                        } else {
                            posodobiPovprecnoOceno(dogodek._id);
                            res.status(200).json(trenutniKomentar);
                        }
                    });
                }
            }
        });
};

const komentarjiIzbrisiIzbranega = (req, res) => {
    const {idDogodka, idKomentarja} = req.params;
    if (!idDogodka || !idKomentarja) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem dogodka oz. komentarja, " +
                "idDogodka in idKomentarja sta obvezna parametra."
        });
    }
    Dogodek
        .findById(idDogodka)
        .select('komentarji')
        .exec((napaka, dogodek) => {
            if (!dogodek) {
                return res.status(404).json({"sporočilo": "Ne najdem dogodka."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (dogodek.komentarji && dogodek.komentarji.length > 0) {
                if (!dogodek.komentarji.id(idKomentarja)) {
                    return res.status(404).json({"sporočilo": "Ne najdem komentarja."});
                } else {
                    dogodek.komentarji.id(idKomentarja).remove();
                    dogodek.save((napaka) => {
                        if (napaka) {
                            return res.status(500).json(napaka);
                        } else {
                            posodobiPovprecnoOceno(dogodek._id);
                            res.status(204).json(null);
                        }
                    });
                }
            } else {
                res.status(404).json({"sporočilo": "Ni komentarja za brisanje."});
            }
        });
};

const dodajKomentar = (req, res, dogodek) => {
    if (!dogodek) {
        res.status(404).json({"sporočilo": "Ne najdem dogodka."});
    } else {
        dogodek.komentarji.push({
            ime: req.body.ime,
            ocena: req.body.ocena,
            vsebina: req.body.vsebina
        });
        dogodek.save((napaka, dogodek) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                posodobiPovprecnoOceno(dogodek);
                const dodaniKomentar = dogodek.komentarji.slice(-1).pop();
                res.status(201).json(dodaniKomentar);
            }
        });
    }
};

const posodobiPovprecnoOceno = (idDogodka) => {
    Dogodek
        .findById(idDogodka)
        .select('ocena komentarji')
        .exec((napaka, dogodek) => {
            if (!napaka)
                izracunajPovprecnoOceno(dogodek);
        });
};

const izracunajPovprecnoOceno = (dogodek) => {
    if (dogodek.komentarji && dogodek.komentarji.length > 0) {
        const steviloKomentarjev = dogodek.komentarji.length;
        const skupnaOcena = dogodek.komentarji.reduce((vsota, {ocena}) => {
            return vsota + ocena;
        }, 0);
        var ocena = skupnaOcena / steviloKomentarjev;
        dogodek.ocena = ocena;

        dogodek.save((napaka) => {
            if (napaka) {
                //console.log(napaka);
            } else {
                console.log(`Povprečna ocena je posodobljena na ${dogodek.ocena}.`);
            }
        });
    }
};

// const shraniKomentar = (req, res) => {};

module.exports = {
    komentarjiKreiraj,
    komentarjiPreberiIzbranega,
    komentarjiPosodobiIzbranega,
    komentarjiIzbrisiIzbranega,
    dodajKomentar,
    // shraniKomentar
};