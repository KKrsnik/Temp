const express = require('express');
const router = express.Router();
const ctrlDogodki = require('../controllers/dogodki');
const ctrlKomentarji = require('../controllers/komentarji');
const ctrlUporabniki = require('../controllers/uporabniki');
const ctrlLokacije = require('../controllers/lokacije');

/* Dogodki */
router.get('/dogodki',
    ctrlDogodki.dogodkiSeznam);
router.post('/dogodki',
    ctrlDogodki.dogodekKreiraj);
router.get('/dogodki/:idDogodka',
    ctrlDogodki.dogodkiPreberiIzbrano);
router.put('/dogodki/:idDogodka',
    ctrlDogodki.dogodkiPosodobiIzbrano);
router.delete('/dogodki/:idDogodka',
    ctrlDogodki.dogodkiIzbrisiIzbrano);

/* Komentarji */
router.post('/dogodki/:idDogodka/komentarji',
    ctrlKomentarji.komentarjiKreiraj);
router.get('/dogodki/:idDogodka/komentarji/:idKomentarja',
    ctrlKomentarji.komentarjiPreberiIzbranega);
router.put('/dogodki/:idDogodka/komentarji/:idKomentarja',
    ctrlKomentarji.komentarjiPosodobiIzbranega);
router.delete('/dogodki/:idDogodka/komentarji/:idKomentarja',
    ctrlKomentarji.komentarjiIzbrisiIzbranega);

/* Uporabniki */
router.get('/uporabniki',
    ctrlUporabniki.uporabnikiSeznam);
router.post('/uporabniki',
    ctrlUporabniki.uporabnikiKreiraj);
router.delete('/uporabniki/:idUporabnik',
    ctrlUporabniki.uporabnikiIzbrisiIzbrano);

/* Lokacije */

router.get('/lokacije',
    ctrlLokacije.lokacijeSeznam);
router.post('/lokacije',
    ctrlLokacije.lokacijeKreiraj);
router.delete('/lokacije/:idUporabnik',
    ctrlLokacije.lokacijeIzbrisiIzbrano);
module.exports = router;