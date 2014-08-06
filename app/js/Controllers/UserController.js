angular.module("MotoNet.Controllers")
    .controller("UserController", function($scope, FacebookAuthService, ApiService) {
        $scope.userLoggedIn = true;

        var handleLoginResponse = function(response) {
            console.log(response);

            if(response.status == "connected") {
                $scope.userLoggedIn = true;

                FacebookAuthService.getUserDetails(function(userData) {
                    console.log(userData);
                    // Logic for checking we have right data

                    ApiService.authoriseUserAgainstApi(
                        response.authResponse.accessToken,
                        response.authResponse.userID
                    ).then(function(data) {
                        console.log(data);
                    });
                });
            } else {
                $scope.userLoggedIn = false;
            }

            $scope.$apply();
        };

        FacebookAuthService.getLoginStatus(handleLoginResponse);

        $scope.login = function () {
            FacebookAuthService.login(handleLoginResponse);
        };
    });