(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.checkList = function() {
    if(!$scope.userInput || !$scope.userInput.trim()) {
      $scope.outputMsg = "Please enter data first.";
      $scope.statusColor = "red";
    }
    else {
      $scope.statusColor = "green";
      if(calculateNumberOfItems($scope.userInput) < 4){
        $scope.outputMsg = "Enjoy!";
      }
      else {
        $scope.outputMsg = "Too Much!";
      }
    }
  }
}

function calculateNumberOfItems(inputString) {
  return inputString.split(",").filter(isValidItem).length;
}

function isValidItem(inputString) {
  return inputString.trim()
}

})();
