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
    title: 'Index',
  });
});

module.exports = router;
