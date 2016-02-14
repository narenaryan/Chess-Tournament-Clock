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
     templateUrl: 'second.html'
        })
  .state('info', {
     url: '/info',
     templateUrl: 'third.html'
        })
  $urlRouterProvider.otherwise('/begin')
})

.controller('beginCtrl', function($scope, $state, myService) {
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

.controller('timerCtrl', function($scope, $state, myService) {

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
    
    $state.go('timer');
  };
}).factory('myService', function() {
       var savedData = {}
       function set(data) {
         savedData = data;
       }
       function get() {
        return savedData;
       }

       return {
        set: set,
        get: get
       }
});