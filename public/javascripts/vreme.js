const APIkey = "3f582a0761028410d315f6d67e1bd63f";

// called form eventDetails.hbs on maps iframe load... because that is the only tag i found that onLoad works on...
function getWeather(lat, lon, eventDate) {
    console.log(eventDate);
    var maxShownDate = moment().add(5, 'days')
    var eventMoment = moment(eventDate)
    if (eventMoment.isBefore(maxShownDate) && !eventMoment.isBefore(moment())) {
        var request = new XMLHttpRequest()
        console.log("loaded")
// Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&lang=SL&appid=' + APIkey, true)

        request.onload = function () {
            var data = JSON.parse(this.response)
            console.log(data)
            for (let i = 0; i < data.list.length; i++) {
                var listEl = data.list[i];
                var listDate = moment(listEl.dt_txt);
                if (listDate.isAfter(eventMoment)) {
                    $("#weatherDescription").text(listEl.weather[0].description);
                    $("#weatherTemp").text("Temperatura: " + listEl.main.temp + "°C");
                    $("#weatherFeelsLike").text("Občutek: " + listEl.main.feels_like + "°C")
                    break;
                }
            }
        }

// Send request
        request.send()
    } else if (eventMoment.isBefore(moment())) {
        document.getElementById("weather").style.display = "none"
        document.getElementById("login").style.display = "none"
    } else {
        console.log("je cez vec kot 5 dni")
    }
}