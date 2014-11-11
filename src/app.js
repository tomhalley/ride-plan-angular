'use strict';

angular.module('RidePlan', [
    'ui.router',
    'facebook',
    'RidePlan.Common',
    'RidePlan.Controllers',
    'RidePlan.Directives',
    'RidePlan.Filters',
    'RidePlan.Services'
])
    .constant("API_URL", "http://localhost")
    .constant("API_PORT", 3000)
    .constant("GOOGLE_API_KEY", "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc")
    .config(function($stateProvider, $urlRouterProvider) {
        var partialsPath = "partials";

        $stateProvider
            .state('ride-plan', {
                abstract: true,
                views: {
                    'header': {
                        templateUrl: partialsPath + '/shared/header.html',
                        controller: "UserController"
                    },
                    'footer': {
                        templateUrl: partialsPath + '/shared/footer.html'
                    }
                }
            })
            .state('ride-plan.home', {
                url: "/",
                views: {
                    'content@': {
                        templateUrl: partialsPath + '/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('ride-plan.create', {
                url: '/create',
                views: {
                    'content@': {
                        templateUrl: partialsPath + '/create.html',
                        controller: 'CreateController'
                    }
                }
            })
            .state('ride-plan.event', {
                url: '/event/:id',
                views: {
                    'content@': {
                        templateUrl: partialsPath + '/event.html',
                        controller: 'EventController'
                    }
                }
            })
            .state('ride-plan.anyError', {
                url: '/error',
                views: {
                    'content@': {
                        templateUrl: partialsPath + '/error.html',
                        controller: 'ErrorController'
                    }
                }
            })
            .state('ride-plan.specificError', {
                url: '/error/:code',
                views: {
                    'content@': {
                        templateUrl: partialsPath + '/error.html',
                        controller: 'ErrorController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/error/404');
    })
    .config(function(FacebookProvider) {
        FacebookProvider.init({
            appId      : '1478417649072538',
            status     : true,
            xfbml      : true,
            version    : 'v2.0'
        });
    })
    .run(function($rootScope, $location, $window) {
        $rootScope.$on('$stateChangeSuccess', function () {
            if (!$window.ga) {
                return;
            }
            $window.ga('send', 'pageview', {page: $location.path()});
        })
    });

// Define module dependencies
angular.module("RidePlan.Common",        []);
angular.module("RidePlan.Controllers",   ['google-maps', 'ui.directives', 'dialogs.main', 'ui.bootstrap']);
angular.module("RidePlan.Directives",    []);
angular.module("RidePlan.Factories",     []);
angular.module("RidePlan.Services",      []);
angular.module("RidePlan.Filters",       []);