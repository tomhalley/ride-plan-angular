angular.module("RidePlan.Services")
    .service("ApiService", function($http, $q, API_URL, API_PORT) {
        var sessionCookie = null;

        this.getSessionCookie = function() {
            return sessionCookie;
        };

        this.authoriseUserAgainstApi = function(accessToken, userId) {
            var deferred = $q.defer();

            $http.post(API_URL + ":" + API_PORT + "/user/authoriseWithFacebook",  {
                access_token: accessToken,
                user_id: userId
            })
            .success(function(data) {
                sessionCookie = JSON.parse(data);
                deferred.resolve(data);
            })
            .error(function(data, status) {
                switch(status) {
                    default:
                        deferred.reject("Unable to authorize user");
                        break;
                }
            });

            return deferred.promise;
        };
    });