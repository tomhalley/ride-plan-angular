"use strict";

angular.module("RidePlan.Controllers")
    .controller("UserController", ['$scope', 'FacebookAuthService', 'AuthService', 'dialogs', function($scope, FacebookAuthService, AuthService, dialogs) {
        $scope.userLoggedIn = null;

        FacebookAuthService.getLoginStatus()
            .then(function(result) {
                $scope.userLoggedIn = result;
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

        $scope.$on('facebookLoginClicked', function() {
            FacebookAuthService.login()
                .then(function(result) {
                    $scope.userLoggedIn = result;
                });
        });
    }]);