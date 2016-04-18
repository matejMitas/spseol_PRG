/* -------------------------------- 

App

-------------------------------- */
var mathApp = angular.module('mathApp', []);

mathApp.controller('mainCtrl', ['$scope', 'getTasks', function($scope, getTasks){

  var counter = 0;
  var max = 0;
  var tasks;
  var inactive = "inactive";
  var elems = {
    oper: document.getElementById("operations"),
    app: document.getElementById("app"),
    results: document.getElementById("results"),
  }

  $scope.correct = 0;
  $scope.wrong = 0;

  $scope.evaluate = function() {

    if (counter < max - 1) {

      if ($scope.result == tasks[counter].expectedResult) {
        $scope.correct++;
      } else {
        $scope.wrong++;
      }

      $scope.result = "";
      
      counter++;

      $scope.num1 = tasks[counter].firstNum;
      $scope.num2 = tasks[counter].secondNum;
      $scope.sign = tasks[counter].operator;
      $scope.remaining = (counter + 1) + "/" + max;
    }
  }

  $scope.getSigns = function() {
    
    max = $scope.numTasks;
    tasks = getTasks.generate($scope.signs, max);

    // fill in the start state
    $scope.num1 = tasks[counter].firstNum;
    $scope.num2 = tasks[counter].secondNum;
    $scope.sign = tasks[counter].operator;
    $scope.remaining = 1 + "/" + max;

    // adjust the UI
    elems.app.classList.remove(inactive);
    elems.results.classList.remove(inactive);
    elems.oper.classList.add(inactive);

  }

}]);



