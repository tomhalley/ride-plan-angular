'use strict';


// Declare app level module which depends on filters, and services
angular.module('MotoNet', [
    'ngRoute',
    'MotoNet.Common',
    'MotoNet.Controllers',
    'MotoNet.Directives',
    'MotoNet.Services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/find', {templateUrl: 'partials/find.html', controller: 'FindController'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
    constant("CONFIG", {
        MOTONET_API_URL: "localhost",
        GOOGLE_API_KEY: "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc"
    });

angular.module("MotoNet.Common",        []);
angular.module("MotoNet.Controllers",   ['google-maps', "ui.directives"]);
angular.module("MotoNet.Directives",    []);
angular.module("MotoNet.Services",      []);