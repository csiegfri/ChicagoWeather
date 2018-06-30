let app = angular.module('App',[]);
app.controller('Controller',function($scope){
  $scope.cities = ["Chicago","Aurora","Springfield","Rockford","Peoria"];
  $scope.measures = ["Imperial","Metric"];
  $scope.display = [5,10,15,"All"];

  $scope.drawTable = function(city, unit, disp){
    
  }
})
