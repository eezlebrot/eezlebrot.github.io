(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)

//-- NarrowItDownController --
NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  $scope.foundItems = [];

  this.searchTerm = "";
  this.getItems = function() {
    if(this.searchTerm.length > 0) {
      var promise = MenuSearchService.getMatchedMenuItems(this.searchTerm);
      promise.then(function(result) {
        $scope.foundItems = result;
        $scope.showError = ($scope.foundItems.length == 0);
      });
    }
    else {
      $scope.showError = true;
    }
  }

  this.removeItemByIndex = function(index) {
    console.log("trying to remove" + index);
    $scope.foundItems.splice(index, 1);
  }
}

// //-- FoundItems Directive Factory Function --
function FoundItems() {
  var ddo = {
    restrict:'E',
    scope: {
      dbg: '=',
      foundItems: '=',
      removeItem: '&onRemove'
    },
    templateUrl: "foundItems.html"
  };
  return ddo;
}

// -- MenuSearchService --
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {

  //getMatchedMenuItems() returns a promise object with an array of foundItems
  this.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json",
    }).then(function (response) {
        // process result and only keep items that match
        var menuItems = response.data.menu_items;
        var foundItems = [];
        menuItems.forEach(function(value){
          if(value.description.includes(searchTerm))
          {
            value.description = value.description.capitalize();
            foundItems.push(value);
          }
        });
        return(foundItems);
    });
  }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

})();
