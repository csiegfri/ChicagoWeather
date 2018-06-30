const requ = require('request-promise-native');

let options = {};

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

      }
  }
})
