const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('setChecked', (value, currentValue) => {
    if (value == currentValue) {
        return 'checked';
    } else {
        return "";
    }
});

hbs.registerHelper('zvezdice', (ocena) => {
    let zvezdice = '';
    for (let i = 1; i <= 5; i++) {
        if (ocena >= i) zvezdice += '<i style="color: #ffff00" class="fas fa-star fa-3x"></i>';
        else if (i - 1 + 0.25 < ocena && ocena < i - 1 + 0.75) zvezdice += '<i style="color: yellow" class="fas fa-star-half-alt fa-3x"></i>';
        else zvezdice += '<i class="far fa-star fa-3x"></i>';
    }
    return zvezdice;
});

hbs.registerHelper('zasedenost', (max, trenutno) => {
    let zasedenost = trenutno / max * 100;
    return zasedenost;
});

hbs.registerHelper('anonimnost', (ime) => {
    if (ime == 'anonimno') {
        return '<td class= anonimno>' + ime + '</td>';
    } else {
        return '<td>' + ime + '</td>';
    }
});

hbs.registerHelper('datumIzpisVInputu', (datum) => {
    date = new Date(datum);
    return date.toISOString().slice(0, 16);
})

hbs.registerHelper('datumHome', (datum) => {
    ret = moment(datum).format('DD. MM. YYYY ob HH:mm')
    return ret;
})