(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories
  .state('categories', {
    url: '/categories',
    template: '<categories cat-items="catCtrl.items"></categories>',
    controller: "CategoriesController as catCtrl",
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // items
  .state('items', {
    url: '/items/{categoryId}',
    template: '<items menu-items=itemsCtrl.menuItems></items>',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      menuItems: ['$stateParams', 'MenuDataService',
      function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }

  });
}

})();
