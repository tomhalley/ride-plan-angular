'use strict';

angular.module('RidePlan', [
    'ui.router',
    'RidePlan.Common',
    'RidePlan.Controllers',
    'RidePlan.Directives',
    'RidePlan.Filters',
    'RidePlan.Services'
])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('ride-plan', {
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'partials/shared/header.html',
                        controller: "UserController"
                    },
                    'footer': {
                        templateUrl: 'partials/shared/footer.html'
                    }
                }
            })
            .state('ride-plan.home', {
                url: "/",
                parent: 'ride-plan',
                views: {
                    'content@': {
                        templateUrl: 'partials/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('ride-plan.create', {
                url: '/create',
                parent: 'ride-plan',
                views: {
                    'content@': {
                        templateUrl: 'partials/create.html',
                        controller: 'CreateController'
                    }
                }
            })
            .state('ride-plan.event', {
                url: '/event/:id',
                views: {
                    'content@': {
                        templateUrl: 'partials/event.html',
                        controller: 'EventController'
                    }
                }
            })
            .state('ride-plan.anyError', {
                url: '/error',
                views: {
                    'content@': {
                        templateUrl: 'partials/error.html',
                        controller: 'ErrorController'
                    }
                }
            })
            .state('ride-plan.specificError', {
                url: '/error/:type',
                views: {
                    'content@': {
                        templateUrl: 'partials/error.html',
                        controller: 'ErrorController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
        $rootScope.$on('$stateChangeSuccess', function () {
            if (!$window.ga) {
                return;
            }
            $window.ga('send', 'pageview', {page: $location.path()});
        })
    }])
    .constant("API_URL", "http://localhost")
    .constant("API_PORT", 3000)
    .constant("GOOGLE_API_KEY", "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc");

// Define module dependencies
angular.module("RidePlan.Common",        []);
angular.module("RidePlan.Controllers",   ['google-maps', "ui.directives"]);
angular.module("RidePlan.Directives",    []);
angular.module("RidePlan.Factories",     []);
angular.module("RidePlan.Services",      []);
angular.module("RidePlan.Filters",       []);