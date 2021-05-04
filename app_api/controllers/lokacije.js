const mongoose = require('mongoose');
const Lokacija=mongoose.model('Lokacija');

const lokacijeSeznam = (req, res) => {
    Lokacija
        .find()
        .exec((napaka, lokacija) => {
            if (!lokacija) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem lokacije."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(lokacija);
        });
};

const lokacijeKreiraj = (req, res) => {
    Lokacija.create({
        mesto: req.body.mesto,
        naslov: req.body.naslov,

    }, (napaka, lokacija) => {
        if(napaka) {
            res.status(400).json(napaka);
        }
        else {
            res.status(201).json(lokacija);
        }
    });
};

const lokacijeIzbrisiIzbrano = (req, res) => {
    const {idLokacije} = req.params;
    if (idLokacije) {
        Lokacija
            .findByIdAndRemove(idLokacije)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem lokacije, idLokacije je obvezen parameter."
        });
    }
};


module.exports = {
    lokacijeIzbrisiIzbrano,
    lokacijeKreiraj,
    lokacijeSeznam
}


