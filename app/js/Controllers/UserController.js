"use strict";

angular.module("RidePlan.Controllers")
    .controller("UserController", ['$scope', 'FacebookAuthService', 'AuthService', 'dialogs', function($scope, FacebookAuthService, AuthService, dialogs) {
        $scope.userLoggedIn = null;

        FacebookAuthService.getLoginStatus(handleLoginResponse);

        $scope.methods = {
            login: function() {
                dialogs.create('partials/shared/login-modal.html','ModalController', $scope.data);
            },
            logout: function() {
                FacebookAuthService.logout(function() {
                    $scope.userLoggedIn = false;
                    $scope.$apply();
                });
            }
        };
    }]);