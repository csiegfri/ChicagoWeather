const requ = require('request-promise-native');

let options = {
  uri: "",
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

let app = angular.module('App',[]);
app.controller('Controller',function($scope){
  $scope.cities = ["Chicago","Aurora","Springfield","Rockford","Peoria"]; //List of available cities for the project
  $scope.selectedCity = $scope.cities[0]; // Default to Chicago
  let ids = ["4887398","4883817","4896861","4907959","4905687"]; //coressponding API ids for the city they're associated with. The id of cities[0] is ids[0], and so on
  $scope.measures = ["imperial","metric"]; //chooses units of measurement (F and C)
  $scope.selectedUnit = $scope.measures[0]; //Defailt to F
  $scope.display = [5,10,15,"All"]; //Amount of reports to display at once.
  $scope.reportList = [];

  function direction(degrees){
    // The direction() function takes the degree of the wind, and converts it into an understandable cardinal direction
    if(degrees >= 348.75) degrees = 0;
    let cardinal = ["N","N-NE","NE","E-NE","E","E-SE","SE","S-SE","S","S-SW","SW","W-SW","W","W-NW","NW","N-NW"];
    let index = Math.floor(degrees/22.5);
    return cardinal[index];
  };

  $scope.drawTable = function(city, unit, disp){
    let id = "";

    for(let x = 0; x < $scope.cities.length; x++){
      if(city === $scope.cities[x]){
        id = ids[x];
      }
    };

    options.uri = "http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=083149282228ade2d95a8d79cd581982&units=" + unit;


    requ(options)
      .then(function(weather_json)){
        let obj = weather_json;
        let fullReport = [];
        if(displayNum === "All"){
          displayNum = obj.list.length;
        }

        $scope.reportList = []; //Resets current list before running.

        for(let x = 0; x < displayNum; x++){

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

        $scope.reportList = fullReport;

      };

  }
})
