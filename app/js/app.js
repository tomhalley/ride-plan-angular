'use strict';


// Declare app level module which depends on filters, and services
angular.module('MotoNet', [
    'ui.router',
    'MotoNet.Common',
    'MotoNet.Controllers',
    'MotoNet.Directives',
    'MotoNet.Filters',
    'MotoNet.Services'
])
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
            .state('ride-plan.createEvent', {
                url: '/create',
                parent: 'ride-plan',
                views: {
                    'content@': {
                        templateUrl: 'partials/create.html',
                        controller: 'CreateController'
                    }
                }
            })
            .state('ride-plan.eventPage', {
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
        $rootScope.$on('$stateChangeSuccess',
            function (event) {
                if (!$window.ga) {
                    return;
                }
                $window.ga('send', 'pageview', {page: $location.path()});
            }
        )
    }])
    .constant("MOTONET_API_URL", "http://localhost")
    .constant("MOTONET_API_PORT", 3000)
    .constant("GOOGLE_API_KEY", "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc");

angular.module("MotoNet.Common",        []);
angular.module("MotoNet.Controllers",   ['google-maps', "ui.directives"]);
angular.module("MotoNet.Directives",    []);
angular.module("MotoNet.Factories",     []);
angular.module("MotoNet.Services",      []);
angular.module("MotoNet.Filters",       []);