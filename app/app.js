'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.jokes',
  'myApp.auth',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
    'satellizer'
])
    .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {

      var server = 'https://ionic-joke-api-ejpenner.c9users.io/';

      $authProvider.loginUrl =  server + 'api/v1/authenticate';
      // $urlRouterProvider.otherwise('/view1');
      $urlRouterProvider.otherwise('/auth');
    }]);