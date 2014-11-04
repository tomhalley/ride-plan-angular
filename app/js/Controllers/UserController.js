"use strict";

angular.module("RidePlan.Controllers")
    .controller("UserController", ['$scope', 'FacebookAuthService', 'AuthService', function($scope, FacebookAuthService, AuthService) {
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
                FacebookAuthService.login(handleLoginResponse);
            },
            logout: function() {
                FacebookAuthService.logout(function() {
                    $scope.userLoggedIn = false;
                    $scope.$apply();
                });
            }
        };
    }]);