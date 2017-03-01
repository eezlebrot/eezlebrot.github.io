(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  //Returns a promise with data of categories
  service.getAllCategories = function() {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json",
    }).then(function (response) {
      return(response.data);
    });
  }

  //Returns a promise with data of items in the specified categoryShortName
  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      params: {'category': categoryShortName}
    }).then(function (response) {
      return(response.data);
    });
  }
}

})();
