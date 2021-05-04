const mongoose = require('mongoose');


const komentarjiShema = new mongoose.Schema({
    ime: String,
    ocena: Number,
    vsebina: String
});

const lokacijaShema = new mongoose.Schema({
    mesto: {type: String},
    naslov: {type: String, required: true},
});

const uporabnikShema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const dogodekShema = new mongoose.Schema({
    title: {type: String},
    ime_dogodka: {type: String, required: true},
    mesto: {type: String, required: true},
    naslov: {type: String},
    prostor: {type: String, required: true},
    organizator: {type: String, required: true},
    tip: {type: String, required: true},
    max_ljudi: {type: Number, required: true},
    kreator: {uporabnikShema},
    prijavljeni: {type: Number},
    lokacija: {lokacijaShema},
    datum: {type: Date, required: true},
    ura: {type: String},
    vreme: {type: String},
    cena: {type: Number, required: true},
    opis: {type: String},
    komentarji: [komentarjiShema],
    koordinate: {type: [Number], index: '2dsphere'},
    ocena: {type: Number, default: 0},
    ocena: {type: Number, default: 7}
});

mongoose.model('Komentar', komentarjiShema, 'Komentar');
mongoose.model('Dogodek', dogodekShema, 'Dogodek');
mongoose.model("Uporabnik", uporabnikShema, "Uporabnik");
mongoose.model("Lokacija", lokacijaShema, "Lokacija");
