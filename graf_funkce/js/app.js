(function () {
  'use strict';

  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

  app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('Doughnut', {
      animateScale: true
    });
  });

  app.service('generate', function(){

    // function 

    function linspace(a,b,n) {
      if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
      if(n<2) { return n===1?[a]:[]; }
      var i,ret = Array(n);
      n--;
      for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
      return ret;
    }


    var x = linspace(0,50,10);
    var y = [];





    this.sin = function(){
      for (var i = 0; i <= x.length; i++) {
        y.push(Math.sin(x));
      }
      return x,y;
    };

    this.exp = function() {

    }

    this.log = function() {

    }

    return this;

  });

  app.controller('TabsCtrl', function ($scope, generate) {
    // y axis

    // console.log(generate)

    $scope.data = [[2,4,6,8,9,10]];

    // x axis

    $scope.labels = [0,5,20,50,80];

    // $scope.active = true;

  });
})();
