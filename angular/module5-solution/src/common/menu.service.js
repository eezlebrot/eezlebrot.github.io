(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(menuShortName) {

    //Attempt to grab the menu item; if it exists, store off the user; return true/false of success
    return $http.get(ApiPath + '/menu_items/' + menuShortName + '.json').then(function(response) {
      console.log("TTDEBUG", menuShortName);
      console.log(response.data);
      return response.data;
    });
  }
}



})();
