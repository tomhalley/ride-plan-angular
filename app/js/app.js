'use strict';


// Declare app level module which depends on filters, and services
angular.module('MotoNet', [
    'ngRoute',
    'MotoNet.Common',
    'MotoNet.Controllers',
    'MotoNet.Directives',
    'MotoNet.Filters',
    'MotoNet.Services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateController'});
  $routeProvider.when('/event/:id', {templateUrl: 'partials/event.html', controller: 'EventController'});
  $routeProvider.when('/error', {templateUrl: 'partials/error.html', controller: 'ErrorController'});
  $routeProvider.when('/error/:type', {templateUrl: 'partials/error.html', controller: 'ErrorController'});
  $routeProvider.otherwise({redirectTo: '/'});
}])
    .constant("MOTONET_API_URL", "http://http://ec2-54-77-33-132.eu-west-1.compute.amazonaws.com")
    .constant("MOTONET_API_PORT", 16682)
    .constant("GOOGLE_API_KEY", "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc");

angular.module("MotoNet.Common",        []);
angular.module("MotoNet.Controllers",   ['google-maps', "ui.directives"]);
angular.module("MotoNet.Directives",    []);
angular.module("MotoNet.Factories",     []);
angular.module("MotoNet.Services",      []);
angular.module("MotoNet.Filters",       []);