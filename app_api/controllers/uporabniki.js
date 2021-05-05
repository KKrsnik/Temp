const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

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

const uporabnikiSeznam = (req, res) => {
    Uporabnik
        .find()
        .exec((napaka, uporabnik) => {
            if (!uporabnik) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem uporabnikov."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(uporabnik);
        });
};

const uporabnikiKreiraj = (req, res) => {
    Uporabnik.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,

    }, (napaka, uporabniki) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(uporabniki);
        }
    });
};
const uporabnikPreberiIzbrano = (req, res) => {
    Uporabnik
        .findOne({email: email})
        .select('email password')
        .exec((napaka, uporabnik) => {
            res.status(200).json(uporabnik);
        });
};
const preveriUporabnika = (req, res) => {
    Uporabnik
        .findOne({email: req.body.email})
        .select('password')
        .exec((napaka, uporabnik) => {
            //console.log(uporabnik.password);
            const trentuniUporabnik = req.body.password;
            if (!uporabnik) {
                return res.status(404).json({
                    "sporočilo":
                        "Ni uporabnika 404"
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (trentuniUporabnik === uporabnik.password) {
                console.log("dela");
                res.redirect('/myEvents');
            } else {
                console.log("napacno geslo");
                res.redirect('/prijava');
            }
        });
}
const shraniUporabnika = (req, res) => {
    axios({
        method: 'post',
        url: '/api/uporabniki',
        data: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    }).then(() => {
        res.redirect('/prijava');
    }).catch((napaka) => {
        console.log("napaka");
    });
}

const uporabnikiIzbrisiIzbrano = (req, res) => {
    const {idUporabnika} = req.params;
    if (idUporabnika) {
        Uporabnik
            .findByIdAndRemove(idUporabnika)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem uporabnika, idUporabnika je obvezen parameter."
        });
    }
};

module.exports = {
    uporabnikiKreiraj,
    shraniUporabnika,
    uporabnikPreberiIzbrano,
    preveriUporabnika,
    uporabnikiIzbrisiIzbrano,
    uporabnikiSeznam

}


