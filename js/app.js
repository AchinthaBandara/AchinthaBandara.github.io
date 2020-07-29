(function () {
    'use strict'

    var narrowItDownAppModule = angular.module('NarrowItDownApp', []);

    narrowItDownAppModule.controller('narrowItDownController', NarrowItDownController);
    narrowItDownAppModule.service('menuSearchService', MenuSearchService);
    narrowItDownAppModule.directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
             templateUrl: 'foundItems.html',
             scope: { 
                items: '<',
                onRemove: '&'
             },
             controller: FoundItemsDirectiveController,
             controllerAs: 'found',
             bindToController: true
        };
        return ddo;
    };

    function FoundItemsDirectiveController() {
        var found = this;

        found.nothingFound = function () {
                return found.items && found.items.length === 0;
            };  
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var menuSearchService = this;

        menuSearchService.getMatchedMenuItems = function(searchTerm) {

            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
                        .then(function (result) {
                            if(!searchTerm) {
                                return [];
                            }
                            var foundItems = result.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);                           
                            return foundItems;
                    });
        }
    };

    NarrowItDownController.$inject = ['menuSearchService'];
    function NarrowItDownController(menuSearchService) {
        var narrowItDownController = this;
        //narrowItDownController.found = [];

        narrowItDownController.search = function(searchTerm) {
            menuSearchService.getMatchedMenuItems(searchTerm)
                .then(result => {
                    narrowItDownController.found = result;
                });
        };

        narrowItDownController.removeItem = function(index) {
            narrowItDownController.found.splice(index, 1);
        };
    };
    // function ShoppingListCheckOffService() {
    //     var shoppingListService = this;

    //     shoppingListService.toBuyList = [
    //         { name: 'Apples', quantity: 6 },
    //         { name: 'Pears', quantity: 2 },
    //         { name: 'Oranges', quantity: 3 },
    //         { name: 'Peaches', quantity: 4 },
    //         { name: 'Melons', quantity: 5 },
    //     ];

    //     shoppingListService.boughtList = [];

    //     shoppingListService.getToBuyList = function () {
    //         return shoppingListService.toBuyList;
    //     }

    //     shoppingListService.getBoughtList = function () {
    //         return shoppingListService.boughtList;
    //     }

    //     shoppingListService.markAsBought = function (index) {
    //         shoppingListService.boughtList.push(shoppingListService.toBuyList[index]);
    //         shoppingListService.toBuyList.splice(index, 1);
    //     }
    // }

    // ToBuyController.$inject = ['shoppingListCheckOffService'];
    // function ToBuyController(shoppingListCheckOffService) {
    //     var showToBuyList = this;
    //     showToBuyList.items = shoppingListCheckOffService.getToBuyList();

    //     showToBuyList.markAsBought = function (itemIndex) {
    //         shoppingListCheckOffService.markAsBought(itemIndex);
    //     };
    // }

    // AlreadyBoughtController.$inject = ['shoppingListCheckOffService'];
    // function AlreadyBoughtController(shoppingListCheckOffService) {
    //     var alreadyBoughtList = this;
    //     alreadyBoughtList.items = shoppingListCheckOffService.getBoughtList();
    // }
})();