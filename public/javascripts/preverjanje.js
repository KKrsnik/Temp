function checkPassword(form) {
    password = form.password.value;
    password2 = form.password2.value;

    // If password not entered
    if (password == '')
        alert ("Prosim vnesite geslo.");

    // If confirm password not entered
    else if (password2 == '')
        alert ("Prosim potrdite geslo.");

    // If Not same return False.
    else if (password != password2) {
        alert ("\nGesli se ne ujemata, preverite potrditev gesla.")
        return false;
    }
    else{
        return true;
    }
}
function ValidateEmail(form)
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(form.email.value.match(mailformat))
    {
        return true;
    }
    else
    {
        alert("Vnesite pravilni email!");
        return false;
    }
}
function ValidatePassword(form) {
    var str = form.password.value;
    if (str.match(/[a-z]/g) && str.match(
        /[A-Z]/g) && str.match(
        /[0-9]/g) && str.match(
        /[^a-zA-Z\d]/g) && str.length >= 8){
        return true;}
    else{
        alert("Geslo mora vsebovati vsaj eno številko, eno malo črko, eno veliko črko in biti dolžine vsaj 8 znakov");
        return false;
    }
}
function ValidateUsername(form) {
    var a = form.username.value;
    if(a.match(/^[0-9a-zA-Z]+$/))
    {
        return true;
    }else{
        alert("Uporabniško ime mora vsebovati samo črke in številke");
        return false;
    }
    return true;
}

function ValidateAddEventForm(form) {
    sth = form.ime_dogodka;
    if(sth.value == "") {
        alert("Vpišite ime vašega dogodka")
        sth.focus();
        return false;
    }
    sth = form.naslov;
    if(sth.value == "") {
        alert("Vpišite lokacijo vašega dogodka")
        sth.focus();
        return false;
    }
    sth = form.mesto;
    if(sth.value == "") {
        alert("Vpišite najbližje večje mesto vašega dogodka")
        sth.focus();
        return false;
    }
    sth = form.organizator;
    if(sth.value == "") {
        alert("Vpišite organizatorja vašega dogodka")
        sth.focus();
        return false;
    }

    sth = form.datum;

    time = Date.parse(sth.value);
    now = Date.now();
    if(sth.value == "") {
        alert("Vnesite čas dokodka.");
        sth.focus();
        return false;
    }
    if (time < now) {
        alert("Čas dogodka je v preteklosti. Vnesite pravilen čas dogodka");
        sth.focus();
        return false;
    }

    sth = form.opis;
    if(sth.value.length < 50) {
        alert("Vpišite podrobnejši opis vašega dogodka")
        sth.focus();
        return false;
    }

    alert("Dogodek uspešno dodan");
    return true;
}
