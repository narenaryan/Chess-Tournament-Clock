angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('begin', {
      url: '/begin',
      templateUrl: 'begin.html',
      controller: 'beginCtrl'

    })
    .state('settimer', {
     url: '/settimer',
     templateUrl: 'first.html',
     controller: 'timerCtrl'
        })
  .state('timer', {
     url: '/timer',
     templateUrl: 'second.html',
     controller: 'displayCtrl'
        })
  .state('info', {
     url: '/info',
     templateUrl: 'third.html'
        })
  $urlRouterProvider.otherwise('/begin')
})

.controller('beginCtrl', function($scope, $state) {
  $scope.exit = function(user){
    console.log("Exiting the application");
    window.navigator.app.exitApp()
  }
  $scope.setTimer = function(user) {
    $state.go('settimer');
  };
  
  $scope.setInfo = function(user) {
    $state.go('info');
  };
})

.controller('timerCtrl', function($scope, $state) {


    // Define initial values
    $scope.minutes = 5;
    $scope.rangeTime = true;
    $scope.customTime = false;

    // Toggle Range and Custom timers
    $scope.ShowHide = function () {
                $scope.customTime = $scope.customTime ? false : true;
                $scope.rangeTime = $scope.rangeTime ? false : true;
            }

    // Load timer template
    $scope.startTimer = function(user) {
    var count;
    if($scope.customTime){
      count = parseInt($("#custom_time").val())
    }
    else{
      count = 60;
    }
    window.sessionStorage.setItem("minutes", count);
    $state.go('timer');
  };
})


.controller('displayCtrl', function($scope, $state) {

    // Define initial values
    $scope.existing = window.sessionStorage.getItem("minutes");
    $scope.white_interval = parseInt($scope.existing) * 60
    $scope.black_interval = parseInt($scope.existing) * 60
    $scope.white_interval_id = null
    $scope.black_interval_id = null

    // Timing function. Pass element and time of piece
    $scope.whiteTimer = function(element) {
    intervalID = setInterval((function() {
      var hour, min, sec, str;
      $scope.white_interval--;
      sec = $scope.white_interval % 60;
      min = ($scope.white_interval - sec) / 60 % 60;
      hour = ($scope.white_interval - sec - (min * 60)) / 3600;
      str = hour + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
      $('.'+ element).text(str);
    }), 1000);
    return intervalID;
  };


    $scope.blackTimer = function(element) {
    intervalID = setInterval((function() {
      var hour, min, sec, str;
      $scope.black_interval--;
      sec = $scope.black_interval % 60;
      min = ($scope.black_interval - sec) / 60 % 60;
      hour = ($scope.black_interval - sec - (min * 60)) / 3600;
      str = hour + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
      $('.'+ element).text(str);
    }), 1000);
    return intervalID;
  };

  //Start from white first
  $scope.white_interval_id = $scope.whiteTimer("black-huge-size")


  $scope.whiteTouch = function()
  {
    clearInterval($scope.white_interval_id)
    $scope.black_interval_id = $scope.blackTimer("white-huge-size")
    console.log("white tapped")
  }


  $scope.blackTouch = function()
  {
    clearInterval($scope.black_interval_id)
    $scope.white_interval_id = $scope.whiteTimer("black-huge-size")    
    console.log("black tapped")
    
  }
  });
