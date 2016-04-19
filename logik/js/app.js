/*
 * Copyright (c) 2014 Tommy Siu. Code licensed under the MIT License (MIT).
 */

'use strict';

var myApp = angular.module('angularPaper', ['ui.bootstrap']);

myApp.config(function($locationProvider) {
  $locationProvider.html5Mode(false);
});

myApp.controller('BoardCtrl', function($scope) {
  $scope.boardControl = {};
});

myApp.directive('board', ['$timeout', function(timer) {

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element) {

      /* -------------------------------- 
      
      Base vars
      
      -------------------------------- */

      var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
      var gameCombination = getRandomCombination();
      var counter = 0;
      var colorsToDraw = [];
      var currentColumnCount = 0;
      var currentRowCount = 0;
      var endGame = document.getElementById("end");

      /* -------------------------------- 
      
      Helper functions
      
      -------------------------------- */

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      function getRandomCombination() {
        var combination = [];
        for (var i = 0, l = colors.length; i < 4; i++) {
          combination.push(colors[getRandomInt(0, l - 1)]);
        }
        return combination;
      }

      // console.log(getRandomCombination());

      /* -------------------------------- 
      
      Use an internalControl object to expose operations
      
      -------------------------------- */

      scope.internalControl = scope.boardControl || {};
      scope.internalControl.resetBoard = function() {
          drawBase();
          currentColumnCount = 0;
          currentRowCount = 0;
          counter = 0;
          end.classList.remove("inactive");
      };

      scope.internalControl.draw = function(color) {
        // draw(color);

        if (colorsToDraw.length < 4) {
          colorsToDraw.push(color);
          drawNextMove(color);
          currentColumnCount++;

          if (colorsToDraw.length == 4) {
            drawMoveResult(colorsToDraw);

            if (colorsToDraw.toString() === gameCombination.toString() || currentRowCount == 6) {
              end.classList.add("inactive");
            }

            colorsToDraw = [];
            currentColumnCount = 0;
            currentRowCount++;

          }
        }
      };

      /* -------------------------------- 
        
      Asign the paperscope to scope
        
      -------------------------------- */

      if (!scope.paper) {
            scope.paper = new paper.PaperScope();
            scope.paper.setup(element[0]);

            // assign the global paper object
            paper = scope.paper;
      }

      /* -------------------------------- 
      
      Draw base playground
      
      -------------------------------- */

      function drawBase() {

        // clear all drawing items on active layer
        scope.paper.project.activeLayer.removeChildren();

        // clear all drawing items on active layer

        var width = 400;
        var height = 400;
        var boardSize = [4,7];
        var start = [0,0];

        var stepX = width / boardSize[0];
        var stepY = height / boardSize[1];

        var rows = 0;

        function drawRows() {
          for (var i = 0; i < boardSize[1]; i++) {
            for (var j = 0; j < boardSize[0]; j++) {
              var rowPath = new paper.Path.Circle({
                center: [50 + (80 * j), 50 + (80 *rows)],
                radius: 30,
                fillColor: "#ccc"
              });
            }
            rows++;
          }
        }

        drawRows();

        // assign the global paper object
        paper.view.draw();
      }

      /* -------------------------------- 
      
      Draw Row
      
      -------------------------------- */


      function drawNextMove(color) {

        // clear all drawing items on active layer

        if (currentColumnCount < 4) {
          var rowPath = new paper.Path.Circle({
                  center: [50 + (80 * currentColumnCount) , 50 + (80 * currentRowCount)],
                  radius: 30,
                  fillColor: color
          });
        }

        paper.view.draw();
      }



      // var toCheck = ["red", "yellow", "green"];
      // function findDuplicates(toCheck) {
      //   for (var i = 0; i < 3; i++) {
      //     console.log(toCheck[i]);
      //   }
      // }

      // findDuplicates(toCheck);

      /* -------------------------------- 
      
      Small things on the rigth
      
      -------------------------------- */

      function drawMoveResult(input) {

        // clear all drawing items on active layer
        var results = [];

        for (var i = 0; i < 4; i++) {

          if (input[i] == gameCombination[i]) {
            results.push("black");
          } else if (gameCombination.indexOf(input[i]) !== -1 && results.indexOf(input[i]) == -1) {
            results.push("white");
          } else {
            results.push("#ccc");
          }


          var path = new paper.Path.Circle({
            center: [350 + (i * 20), 47 + (counter * 80)],
            radius: 8,
            fillColor: results[i]
          });
        }

        counter++;
        paper.view.draw();
      }


      timer(drawBase(), 0);
    }
  };

}]);