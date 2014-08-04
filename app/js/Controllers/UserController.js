angular.module("MotoNet.Controllers")
    .controller("UserController", function($scope, FacebookAuthService) {
        $scope.userLoggedIn = false;

        FacebookAuthService.getLoginStatus(function(response) {
            $scope.userLoggedIn = (response.status == "connected");
            $scope.$apply();
            console.log(response);
        });

        $scope.login = function() {
            FB.login(function(response) {
                $scope.userLoggedIn = (response.status == "connected");
                $scope.$apply();
            });
        };
    });