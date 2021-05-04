var express = require('express');
var router = express.Router();
var ctrlLogin = require("../controllers/login");
const ctrlMain = require('../controllers/main');
const ctrlDogodki = require('../../app_api/controllers/dogodki');
const ctrlUporabniki = require('../../app_api/controllers/uporabniki');
const ctrlKomentarji = require('../../app_api/controllers/komentarji');
const ctrlMail = require('../controllers/mail')

router.get('/db', ctrlMain.db);
router.get('/db/init', ctrlMain.init);
router.get('/db/brisi', ctrlMain.brisi);
router.get('/', ctrlDogodki.getDogodkiSeznam);
router.get('/eventDetails/:idDogodka', ctrlMain.eventDetails);
router.get('/eventRating/:idDogodka', ctrlMain.eventRating);
router.get('/eventArchive', ctrlMain.eventArchive);
router.get('/AddEvent', ctrlDogodki.dodajDogodek);
router.post("/AddEvent", ctrlDogodki.shraniDogodek);
router.get('/EditEvent', ctrlMain.editEvent);
router.get('/EditEvent/:idDogodka', ctrlDogodki.urediDogodek);
router.get('/myEvents', ctrlMain.myEvents)
router.get('/prijava', ctrlLogin.prijava);
router.get('/registracija', ctrlLogin.registracija);
router.get('/pozabljenogeslo', ctrlLogin.pozabljenogeslo);
router.get('/splosnipogoji', ctrlLogin.splosnipogoji);
router.post('/registracija', ctrlUporabniki.shraniUporabnika);
router.post('/prijava', ctrlUporabniki.preveriUporabnika);
router.get('/sendMail', ctrlMail.sendMail)
router.get('/dogodki/:idDogodka', ctrlMain.eventRating);

router.post('/dogodki/:idDogodka/komentar/nov', ctrlMain.shraniKomentar);
router.post('/dogodki/:idDogodka/prijavi', ctrlDogodki.prijavi);
router.post('/dogodki/:idDogodka/odjavi', ctrlDogodki.odjavi);
router.post('/dogodki/:idDogodka/izbrisi', ctrlDogodki.izbrisi);
router.post('/dogodki/:idDogodka/posodobi', ctrlDogodki.posodobiDogodek);

module.exports = router;
router.get('/dogodki/:idDogodka', ctrlMain.eventRating);

router
    .route('/dogodki/:idDogodka/komentar/nov')
    .get(ctrlMain.dodajKomentar)
    .post(ctrlMain.shraniKomentar);

module.exports = router;
