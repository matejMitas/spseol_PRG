/* -------------------------------- 

App

-------------------------------- */
var currencyApp = angular.module('currencyApp', []);

currencyApp.controller('mainCtrl', ['$scope', 'Rates', function($scope, Rates){

    $scope.currencies = Rates.allRates();

    $scope.convert = function() {
        var foreignCurrency = ($scope.foreignCurrency) / 100;
        var transaction = $scope.transaction;
        var value = document.getElementById("sum").value;

        if (transaction == "buy") {
            $scope.result = value / foreignCurrency;
            $scope.rc = $scope.fc;
        } else if (transaction == "sell") {
            $scope.result = value * foreignCurrency;
            $scope.rc = "CZK";  
        }

    }

    $scope.changeMode = function(transaction) {

        var percentage = ($scope.foreignCurrency / 100) * 4.25;

        if (transaction == "buy") {
            $scope.foreignCurrency = $scope.foreignCurrency + percentage;
        } else if (transaction == "sell") {
            $scope.foreignCurrency = $scope.foreignCurrency - percentage;
        }
    }

    $scope.changeCurrency = function(currencySelect) {
        $scope.crowns = 100;
        $scope.foreignCurrency = $scope.crowns * Rates.getRate(currencySelect);
        $scope.fc = currencySelect;   
    }




}]);
