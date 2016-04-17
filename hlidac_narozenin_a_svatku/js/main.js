// safari to dumb to clear console on reload
console.clear();


/* -------------------------------- 

App

-------------------------------- */
var datesApp = angular.module('datesApp', []);

datesApp.controller('mainCtrl', ['$scope', 'getName', function($scope, getName){

    var birthdays = {};

    // set default values

    $scope.date = {
        'day' : 1,
        'month' : 1,
        'year': 2000
    };

    $scope.name = "Nový Rok";

    $scope.getTodayDate = function() {

        var date = new Date();

        $scope.date.day = date.getDate();
        $scope.date.month = date.getMonth() + 1;
        $scope.date.year = date.getFullYear();

        $scope.myFunc();
    }
  
    $scope.myFunc = function() {

        var day = $scope.date.day.toString();
        var month = $scope.date.month.toString();
        var baseYear = "2000";

        $scope.birthdays = birthdays[day+month+baseYear];

        if ($scope.date.day < 10) {
            day = "0" + day;
        } 
        if ($scope.date.month < 10) {
            month = "0" + month;
        }

        $scope.name = getName.test(day + month)[0].name;
    };


    $scope.removeUser = function() {
        var timeStamp = $scope.date.day.toString() + $scope.date.month.toString() + $scope.date.year.toString();
        birthdays[timeStamp].pop();

        $scope.personName = "";
        $scope.personNote = "";
    }

    $scope.addUser = function() {

        var timeStamp = $scope.date.day.toString() + $scope.date.month.toString() + $scope.date.year.toString();

        $scope.error = "";

        if (birthdays[timeStamp] == undefined || birthdays[timeStamp] == []) {
            birthdays[timeStamp] = [{
                name: $scope.personName,
                note: $scope.personNote 
            }];

            $scope.personName = "";
            $scope.personNote = "";
        } else {
            if ($scope.personName !== birthdays[timeStamp][0].name) {
                birthdays[timeStamp].push({
                    name: $scope.personName,
                    note: $scope.personNote 
                });
            } else {
                $scope.error = "ačkoliv není nikde napsáno, že nemůžete přidat dvě osoby stejného jména, už jenom pro vaši orientaci vám doporučuji tyto dvě osoby odlišit.";
            }

            $scope.personName = "";
            $scope.personNote = "";
        }

        $scope.birthdays = birthdays[timeStamp];
    }

}]);
