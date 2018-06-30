const requ = require('request-promise-native');

let options = {};
//Contains all conversions from original values.
let conversions = {
  mintemp:0,
  cTemp:0,
  maxTemp:0,
  windDirection:"Undefined",
  windSpeed:0
};

let app = angular.module('App',[]);
app.controller('Controller',function($scope){
  $scope.cities = ["Chicago","Aurora","Springfield","Rockford","Peoria"];
  let ids = ["4887398","4883817","4896861","4907959","4905687"];
  $scope.measures = ["imperial","metric"];
  $scope.display = [5,10,15,"All"];

  $scope.drawTable = function(city, unit, disp){
    let id = "";
    for(let x = 0; x < $scope.cities.length; x++){
      if(city === $scope.cities[x]){
        id = ids[x];
      }
    };
    let url = "http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=083149282228ade2d95a8d79cd581982&units=" + unit;
    options = {
      uri: url,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    requ(options)
      .then(function(weather_json)){
        let obj = weather_json;
        let fullReport = [];

        for(let x = 0; x < obj.list.length; x++){

          conversions.cTemp = obj.list[x].main.temp ; // Already in correct format
          conversions.minTemp = obj.list[x].main.temp_min ;
          conversions.maxTemp = obj.list[x].main.temp_max ;
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
          //Wind default m/s
          //wind direction default uses degree notation
          //humidity %, cloudiness is % of cloud cover
          fullReport.push(report);
        };
        let table = document.getElementById('generatedReports');
        
      };

  }
})
