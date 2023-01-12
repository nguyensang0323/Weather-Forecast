var apiKey = '8acb69f53d69088ef41120fe0239cf5d';
var findBtn = document.querySelector('#find-button');
var presentCity = document.querySelector('#present-city');
var presentDate = document.querySelector('#present-date');
var presentTemp = document.querySelector('#present-temp');
var presentWind = document.querySelector('#present-wind');
var presentHumidity = document.querySelector('#present-humidity');

var forecastHolder = document.querySelector('#forecast');

var cityinput = document.querySelector('#find-weather');

findBtn.addEventListener('click', handlesearch);

var searchHistory = [];

function savetoHistory () {

}

function handlesearch (event) {
    if (!cityinput.value) {
        return
    }
    var city = cityinput.value
    fetchPresentweather(city)
    cityinput.value = ''
}

var fetchPresentweather = function (city) {
    var apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

    fetch(apiUrlCurrent)
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        console.log(response);
        displayPresentweather(response);

        var lat = response.coord.lat
        var lon = response.coord.lon

       fetchFutureweather(lat,lon);
    })
}

var displayPresentweather = function (weather) {
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    document.querySelector('#current-icon').setAttribute('src', iconUrl);
    var date = dayjs().format('M/D/YYYY');
    
    presentDate.textContent = date
    presentCity.textContent = weather.name
    presentTemp.textContent = 'Temp: ' + weather.main.temp + "°F"
    presentWind.textContent = 'Wind: ' + weather.wind.speed + " MPH"
    presentHumidity.textContent = 'Humidity: ' + weather.main.humidity + " %"

}

var fetchFutureweather = function (lat,lon) {
    var apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    
    fetch (apiUrlFuture)
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        console.log(response)
        displayFutureweather(response)
    
    })
}

var displayFutureweather = function(weather){

    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();

    var headingSection = document.createElement('div');
    var headingTitle = document.createElement('h4');

    headingSection.setAttribute('class', 'col-12');
    headingTitle.textContent = '5-Day Forecast:';
    headingSection.append(headingTitle);

    forecastHolder.innerHTML = '';
    forecastHolder.append(headingSection);

    for (var i = 6; i < weather.list.length; i+=8) {

            createForecastCard(weather.list[i]);
    
      }
}



var createForecastCard = function (forecast){
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var tempEl = forecast.main.temp;
    var humidityEl = forecast.main.humidity;
    var windEl = forecast.wind.speed;

    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var futureTemp = document.createElement('p');
    var futureWind = document.createElement('p');
    var futureHumidity = document.createElement('p');

    col.append(card);
    card.append(cardBody);
    cardBody.append(heading, weatherIcon, futureTemp, futureWind, futureHumidity);

    col.setAttribute('class', 'col-md');
    card.setAttribute('class', 'card bg-success bg-gradient h-150 text-dark border border-dark');
    cardBody.setAttribute('class', 'card-body p-2');
    heading.setAttribute('class', 'card-title');
    futureTemp.setAttribute('class', 'card-text');
    futureWind.setAttribute('class', 'card-text');
    futureHumidity.setAttribute('class', 'card-text');

    heading.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconUrl);
    futureTemp.textContent = `Temp: ${tempEl} °F`;
    futureWind.textContent = `Wind: ${windEl} MPH`;
    futureHumidity.textContent = `Humidity: ${humidityEl} %`;

    forecastHolder.append(col);
}