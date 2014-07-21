'use strict';


// Declare app level module which depends on filters, and services
angular.module('MotoNet', [
  'ngRoute',
  'MotoNet.Controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/find', {templateUrl: 'partials/find.html', controller: 'FindController'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
