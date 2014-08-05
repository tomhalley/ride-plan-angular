angular.module("MotoNet.Controllers")
    .controller("UserController", function($scope, $q, FacebookAuthService, ApiService) {
        var deferred = $q.defer();

        $scope.userLoggedIn = true;

        FacebookAuthService.getLoginStatus(function(response) {
            $scope.userLoggedIn = (response.status == "connected");
            $scope.$apply();
            console.log(response);
        });

        $scope.login = function() {
            FB.login(function(response) {
                $scope.userLoggedIn = (response.status == "connected");
                if(response.status == "connected") {
                    var accessToken = response.authResponse.accessToken;
                    var userId = response.authResponse.userID;
                    console.log(response);
                    var promise = ApiService.authoriseUserAgainstApi(accessToken, userId);

                    promise.then(function(data) {
                        console.log(data);
                    });
//                    deferred.promise
//                        .then(function() {
//                            ApiService.authoriseUserAgainstApi(accessToken, userId);
//                        });
////                    ApiService.authoriseUserAgainstApi()

                    deferred.resolve();
                }
            });
        };
    });