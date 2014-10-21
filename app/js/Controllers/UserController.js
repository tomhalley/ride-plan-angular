angular.module("MotoNet.Controllers")
    .controller("UserController", function($scope, FacebookAuthService, ApiService) {
        $scope.userLoggedIn = null;

        var handleLoginResponse = function(response) {
            if(response.status == "connected") {
                $scope.userLoggedIn = true;

                ApiService.authoriseUserAgainstApi(
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
    });