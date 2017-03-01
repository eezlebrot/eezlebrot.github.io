(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['menuItems'];
function ItemsController(menuItems) {
  var itemsCtrl = this;
  itemsCtrl.menuItems = menuItems.menu_items;
}

})();
