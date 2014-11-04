"use strict";

angular.module("RidePlan.Controllers")
    .controller("UserController", ['$scope', 'FacebookAuthService', 'AuthService', 'dialogs', function($scope, FacebookAuthService, AuthService, dialogs) {
        $scope.userLoggedIn = null;

        var handleLoginResponse = function(response) {
            if(response.status == "connected") {
                $scope.userLoggedIn = true;

                AuthService.authoriseUserAgainstApi(
                    response.authResponse.accessToken,
                    response.authResponse.userID
                );
            } else {
                $scope.userLoggedIn = false;
            }

            $scope.$apply();
        };

        FacebookAuthService.getLoginStatus(handleLoginResponse);

        $scope.methods = {
            login: function() {
                dialogs.create('partials/shared/login-modal.html','ModalController', $scope.data);

                //FacebookAuthService.login(handleLoginResponse);
            },
            logout: function() {
                FacebookAuthService.logout(function() {
                    $scope.userLoggedIn = false;
                    $scope.$apply();
                });
            }
        };
    }]);