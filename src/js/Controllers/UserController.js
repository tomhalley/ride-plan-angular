"use strict";

angular.module("RidePlan.Controllers")
    .controller("UserController", function($scope, $rootScope, FacebookAuthService, AuthService, ErrorService, dialogs) {
        $scope.userLoggedIn = null;

        FacebookAuthService.getLoginStatus()
            .then(function() {
                $scope.userLoggedIn = true;
            }, function() {
                $scope.userLoggedIn = false;
            });

        $scope.methods = {
            login: function() {
                dialogs.create('partials/shared/login-modal.html','ModalController', $scope.data);
            },
            logout: function() {
                FacebookAuthService.logout()
                    .then(function() {
                        $scope.userLoggedIn = false;
                    });
            }
        };

        $scope.$on('loggedIn', function(event, result) {
            $scope.userLoggedIn = result;
        });
    });