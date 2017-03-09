(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegisterService', 'MenuService'];
function MyInfoController(RegisterService, MenuService) {
  var $ctrl = this;
  
  $ctrl.user = RegisterService.getLastUser();

  if($ctrl.user) {
    MenuService.getMenuItem($ctrl.user.favoriteDish).then(function(response) {
      $ctrl.menuItem = response;
    });
  }

  $ctrl.errorMsg = ($ctrl.user == undefined);

}


})();
