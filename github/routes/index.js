var express = require('express');
var router = express.Router();

/* GET home page. */
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
      obj = JSON.parse(weather_json);
  });
  console.log(obj.city.name);
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
function weatherReport(){
  var templateArea = document.querySelector("#report");
  var reports = document.querySelector("#reports");

  var clone = document.importNode(templateArea.content,true);

  for(let x = 0; x < obj.list.length; x++){
    cTemp = (obj.list[x].main.temp * (9/5)) - 459.67;
    minTemp = (obj.list[x].main.temp_min * (9/5)) - 459.67;
    maxTemp = (obj.list[x].main.temp_max * (9/5)) - 459.67;
    //adjusting values of the fields
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].sys.date_txt;
    var nTemp = clone.querySelector("#temp");
    nTemp.textContent = cTemp;
    var nMin = clone.querySelector("#min_temp");
    nMin.textContent = minTemp;
    var nMax = clone.querySelector("#max_temp");
    nMax.textContent = maxTemp;
    var nWeath = clone.querySelector("#weather");
    nWeath.textContent = obj.list[x].weather[0].main;
    var nDesc = clone.querySelector("#weather_desc");
    nDesc.textContent = obj.list[x].weather[0].description;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;
    var nDate = clone.querySelector("#date");
    nDate.textContent = obj.list[x].date;

    //appending the template to the blockquote
    reports.appendChild(clone);
  }
}
