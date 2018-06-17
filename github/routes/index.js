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
var minTemp;
var cTemp;
var maxTemp;
var windDirection;

router.get('/', function(req, res, next){
  requ(options)
    .then(function(weather_json){
      allWeather = weather_json;
      console.log(weather_json.list[0].dt_txt);
      console.log(obj.list[0].dt_txt + " Got all weather");
      let fullReport = [];

      for(let x = 0; x < obj.list.length; x++){

        cTemp = (obj.list[x].main.temp * (9/5)) - 459.67; // converts k to F
        minTemp = (obj.list[x].main.temp_min * (9/5)) - 459.67;
        maxTemp = (obj.list[x].main.temp_max * (9/5)) - 459.67;
        windDirection = direction(obj.list[x].wind.deg); // converts degree to cardinal direction
        //adjusting values of the fields
        let report = {
          date: obj.list[x].dt_txt,
          temp: cTemp,
          min: minTemp,
          max: maxTemp,
          weath: obj.list[x].weather[0].main,
          desc: obj.list[x].weather[0].description,
          hum: obj.list[x].main.humidity,
          speed: obj.list[x].wind.speed,
          dir: windDirection,
          pres: obj.list[x].main.pressure,
          sea: obj.list[x].main.sea_level,
          grn: obj.list[x].main.grnd_level,
          cloud: obj.list[x].clouds.all
        }

        fullReport.push(report);


      };

      res.render('index', {
        title: 'Chicago Weather',
        cDT: Date(results.executionTime),
        reports: fullReport
      });

  });
});


module.exports = router;

 // TODO need function to convert wind degree to understandable direction

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

function weatherReport(obj){
//  console.log(obj.city.name + " loaded.");
  for(let x = 0; x < obj.list.length; x++){
    td.appendChild();
    cTemp = (obj.list[x].main.temp * (9/5)) - 459.67; // converts k to F
    minTemp = (obj.list[x].main.temp_min * (9/5)) - 459.67;
    maxTemp = (obj.list[x].main.temp_max * (9/5)) - 459.67;
    windDirection = direction(obj.list[x].wind.deg); // converts degree to cardinal direction
    //adjusting values of the fields

    var nDate = obj.list[x].dt_txt;
    td.innerHtml = JSON.stringify(nDate);
  //  txt = document.createTextNode(JSON.stringify(nDate));
    //td.appendChild(txt);
    tr.appendChild(td);

    var nTemp = cTemp;
    td.innerHtml = nTemp;
    tr.appendChild(td);

    var nMin = minTemp;
    td.innerHtml = nMin;
    tr.appendChild(td);

    var nMax = maxTemp;
    td.innerHtml = nMax;
    tr.appendChild(td);

    var nWeath = obj.list[x].weather[0].main;
    td.innerHtml = JSON.stringify(nWeath);
    tr.appendChild(td);

    var nDesc = obj.list[x].weather[0].description;
    td.innerHtml = JSON.stringify(nDesc);
    tr.appendChild(td);

    var nHum = obj.list[x].main.humidity;
    td.innerHtml = JSON.stringify(nHum);
    tr.appendChild(td);

    var nSpeed = obj.list[x].wind.speed;
    td.innerHtml = JSON.stringify(nSpeed);
    tr.appendChild(td);

    td.innerHtml = windDirection;
    tr.appendChild(td);

    var nPres = obj.list[x].main.pressure;
    td.innerHtml = JSON.stringify(nPres);
    tr.appendChild(td);

    var nSea = obj.list[x].main.sea_level;
    td.innerHtml = JSON.stringify(nSea);
    tr.appendChild(td);

    var nGrn = obj.list[x].main.grnd_level;
    td.innerHtml = JSON.stringify(nGrn);
    tr.appendChild(td);

    var nCloud = obj.list[x].clouds.all;
    td.innerHtml = nCloud;
    tr.appendChild(td);
  }
  //console.log("Report complete!");
}
