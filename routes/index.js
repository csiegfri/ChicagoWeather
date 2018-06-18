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

//Contains all conversions from original values.
let conversions = {
  mintemp:0,
  cTemp:0,
  maxTemp:0,
  windDirection:"Undefined",
  windSpeed:0
};

router.get('/', function(req, res, next){
  requ(options)
    .then(function(weather_json){
      let obj = weather_json; //There's 2 mainly for the diagnostic;
      console.log(weather_json.list[0].dt_txt);
      console.log(obj.list[0].dt_txt + " Got all weather");
      let fullReport = [];

      for(let x = 0; x < obj.list.length; x++){

        conversions.cTemp = (obj.list[x].main.temp * (9/5)) - 459.67; // converts k to F
        conversions.minTemp = (obj.list[x].main.temp_min * (9/5)) - 459.67;
        conversions.maxTemp = (obj.list[x].main.temp_max * (9/5)) - 459.67;
        conversions.windDirection = direction(obj.list[x].wind.deg); // converts degree notation to cardinal direction
        conversions.windSpeed = obj.list[x].wind.speed * 2.23694; // converts m/s to mph
        //adjusting values of the fields
        let report = {
          date: obj.list[x].dt_txt,
          temp: conversions.cTemp.toFixed(1),
          min: conversions.minTemp.toFixed(1),
          max: conversions.maxTemp.toFixed(1),
          weath: obj.list[x].weather[0].main,
          hum: obj.list[x].main.humidity,
          speed: conversions.windSpeed.toFixed(2),
          dir: conversions.windDirection,
          pres: obj.list[x].main.pressure,
          cloud: obj.list[x].clouds.all
        }
        //date time in yyyy-mm-dd hh:mm:ss
        //Temp default Kelvin
        //Wind default m/s
        //wind direction default uses degree notation
        //humidity %, cloudiness is % of cloud cover
        fullReport.push(report);


      };
      //Once the reoort is populated with all requests, sends over to pug for construction
      res.render('index', {
        title: 'Chicago Weather',
        reports: fullReport
      });

  });
});


module.exports = router;

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
