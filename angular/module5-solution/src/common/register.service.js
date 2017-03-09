(function () {
"use strict";

angular.module('common')
.service('RegisterService', RegisterService);


RegisterService.$inject = ['$http', '$q', 'ApiPath'];
function RegisterService($http, $q, ApiPath) {
  var service = this;
  service.users = [];

  service.registerNewUser = function (user) {
    //Attempt to grab the menu item; if it exists, store off the user; return true/false of success
    return $http.get(ApiPath + '/menu_items/' + user.favoriteDish + '.json')
    .then(function (response) {
      service.users.push(user);
      return (true);
    })
    .catch(function(response) {
      return (false);
    });
  }

  service.getLastUser = function () {
    return service.users[service.users.length-1];
  }

}



})();
