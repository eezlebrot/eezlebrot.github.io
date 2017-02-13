(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.toBuy;

  toBuy.boughtItem = function(itemIdx) {
    ShoppingListCheckOffService.purchaseItem(itemIdx);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.bought;
}

function ShoppingListCheckOffService(){
  var service = this;

  service.toBuy = [
    {name:"Cookies", quantity:10},
    {name:"Milk", quantity:3},
    {name:"Pepto", quantity:4},
    {name:"Frozen Pizzas", quantity:7},
    {name:"Ice Cream", quantity:2}
  ];
  service.bought = [];

  service.purchaseItem = function(itemIdx) {
    service.bought.push(service.toBuy.splice(itemIdx, 1)[0]);
  }

}

})();
