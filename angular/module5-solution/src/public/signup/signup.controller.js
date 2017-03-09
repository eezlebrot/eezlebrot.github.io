(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);


SignupController.$inject = ['RegisterService'];
function SignupController(RegisterService) {
  var $ctrl = this;

  $ctrl.resetSubmitMsg = function() {
    $ctrl.submitSuccess = false;
  }

  $ctrl.submit = function(form) {
    $ctrl.errorMsg = false;
    $ctrl.submitSuccess = false;

    RegisterService.registerNewUser($ctrl.user).then(function (status) {
      $ctrl.success = status;
      if(!$ctrl.success) {
        $ctrl.errorMsg = true;
        form.favoriteDish.$setValidity("favoriteDish", false);
      } else {
        $ctrl.submitSuccess = true;
        $ctrl.lastUser = $ctrl.user.firstName;
    
        //Reset the form
        $ctrl.user = {};
        form.$setPristine();
        form.$setUntouched();
      }
    });
  }
}


})();