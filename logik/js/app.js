/*
 * Copyright (c) 2014 Tommy Siu. Code licensed under the MIT License (MIT).
 */

'use strict';

var myApp = angular.module('angularPaper', ['ui.bootstrap']);

myApp.config(function($locationProvider) {
  $locationProvider.html5Mode(false);
});

myApp.controller('BoardCtrl', function($scope) {
  $scope.boardSize = 19;
  $scope.boardControl = {};
});

myApp.directive('board', ['$timeout', function(timer) {

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element) {

      /*
       * Use an internalControl object to expose operations
       */
      scope.internalControl = scope.boardControl || {};
      scope.internalControl.resetBoard = function() {
        drawEmptyBoard(element[0]);
      };


      function randomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

      /*
       * Function to draw an empty board. This function will be called whenever
       * user reset the board.
       */
      function drawEmptyBoard(element) {

        // setup the paper scope on canvas
        if (!scope.paper) {
          scope.paper = new paper.PaperScope();
          scope.paper.setup(element);
        }

        // clear all drawing items on active layer
        scope.paper.project.activeLayer.removeChildren();

        var width = 400;
        var height = 400;
        var boardSize = [5,10];
        var start = [0,0];

        var stepX = width / boardSize[0];
        var stepY = height / boardSize[1];

        for (var i = 1; i <= boardSize[0]; i++) {
          // generate row
          var x = [start[0] * i, start[1]];
          var y = [stepX * i, stepY];

          new paper.Path.Rectangle({
            from: x,
            to: y,
            strokeColor: 'red' 
          });

          for (var j = 2; j <= boardSize[1] - 1; j++) {
            // generate column
            var x = [start[0] * i, start[1] * j];
            var y = [stepX * i, stepY * j];

            new paper.Path.Rectangle({
              from: x,
              to: y,
              strokeColor: 'green'
            });
          }
        }

        paper.view.draw();

        console.log(scope.paper.project.activeLayer.children);
      }

      timer(drawEmptyBoard(element[0]), 0);
    }
  };

}]);