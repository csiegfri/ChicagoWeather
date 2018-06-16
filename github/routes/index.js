var express = require('express');
var router = express.Router();


// Re-grabbing the code from Week 2 and Week 1
const requ = require('request-promise-native');

const options = {
  uri: 'http://api.openweathermap.org/data/2.5/forecast?id=4887398&appid=083149282228ade2d95a8d79cd581982',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true

};

var obj; // obj will contain the parsed json info for easy access.
var date; //Date time
var min_temp; //minimum temperature (default kelvin)
var max_temp; //maximum temperature (kelvin)
var temp; //current temp (kelvin)
var weather; //current weather status (rainy, snowy, clear, etc)
var humidity; // % of humidity
var wind_speed; // windspeed meters/second
var wind_degree; // direction in degrees (meteorological)
var weather_desc; // futher description of weather
var lon; //longitude of location
var lat; //latitude of location
var pressure; //current pressure in hPa (hectopascal, 1 hPA = roughly 1 atm, or atmosphere)
var sea_level; // Current pressure at sea level in hPa
var ground_level; // Current pressure at ground level in hPa
var cloudiness; // % of cloudiness

router.get('/', function(req, res, next){
  requ(options)
    .then(function(weather_json){
      obj = JSON.parse(weather_json.list);
  });
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Chicago Weather',
  });
});

module.exports = router;

var minTemp;
var cTemp;
var maxTemp;
var windDirection; // TODO need function to convert wind degree to understandable direction

function direction(degrees){
  // The direction() function takes the degree of the wind, and converts it into an understandable cardinal direction
  if(degrees >= 348.75 && degrees < 11.25) return "N";
  else if(degrees < 33.75) return "N-NE";
  else if(degrees < 56.25) return "NE";
  else if(degrees < 78.75) return "E-NE";
  else if(degrees < 101.25) return "E";
  else if(degrees < 123.75) return "E-SE";
  else if(degrees < 146.25) return "SE";
  else if(degrees < 168.75) return "S-SE";
  else if(degrees < 191.25) return "S";
  else if(degrees < 213.75) return "S-SW";
  else if(degrees < 236.25) return "SW";
  else if(degrees < 258.75) return "W-SW";
  else if(degrees < 281.25) return "W";
  else if(degrees < 303.75) return "W-NW";
  else if(degrees < 325.25) return "NW";
  else return "N-NW";
}

function weatherReport(){
  var templateArea = document.querySelector("#report");
  var reports = document.querySelector("#reports");

  var clone = document.importNode(templateArea.content,true);

  for(let x = 0; x < obj.length; x++){
    cTemp = (obj[x].main.temp * (9/5)) - 459.67; // converts k to F
    minTemp = (obj[x].main.temp_min * (9/5)) - 459.67;
    maxTemp = (obj[x].main.temp_max * (9/5)) - 459.67;
    windDirection = direction(obj[x].wind.deg); // converts degree to cardinal direction
    //adjusting values of the fields
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj[x].date_txt;
    var nTemp = clone.querySelector("#temp");
    nTemp.textContent = cTemp;
    var nMin = clone.querySelector("#min_temp");
    nMin.textContent = minTemp;
    var nMax = clone.querySelector("#max_temp");
    nMax.textContent = maxTemp;
    var nWeath = clone.querySelector("#weather");
    nWeath.textContent = obj[x].weather[0].main;
    var nDesc = clone.querySelector("#weather_desc");
    nDesc.textContent = obj[x].weather[0].description;
    var nHum = clone.querySelector("#humidity");
    nHum.textContent = obj[x].main.humidity;
    var nSpeed = clone.querySelector("#wind_speed");
    nSpeed.textContent = obj[x].wind.speed;
    var nDate = clone.querySelector("#wind_degree");
    nDate.textContent = windDirection;
    var nDate = clone.querySelector("#pressure");
    nDate.textContent = obj[x].main.pressure;
    var nDate = clone.querySelector("#sea_level");
    nDate.textContent = obj[x].main.sea_level;
    var nDate = clone.querySelector("#ground_level");
    nDate.textContent = obj[x].main.grnd_level;
    var nDate = clone.querySelector("#cloudiness");
    nDate.textContent = obj[x].clouds.all;

    //appending the template to the table
    reports.appendChild(clone);
  }
}
