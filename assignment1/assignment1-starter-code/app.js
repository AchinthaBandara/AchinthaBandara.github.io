
    'use strict';
    
    var app = angular.module('Check', []);
    app.controller('CheckController', function($scope){

      $scope.checkDishes = function () {
        var count = 0;
        if ($scope.dishes) {
          var array = $scope.dishes.split(',');
          for (var idx in array) {
            if (array[idx].trim().length != 0) {
              count++;
            }
          }
        }
       var num = count;

      if (num === 0) {
        $scope.message = 'Please enter data first';
      }
      else if (num <= 3) {
        $scope.message = 'Enjoy!';
      } else {
        $scope.message = 'Too much!';
      }

        
    };
    
      
  });
    