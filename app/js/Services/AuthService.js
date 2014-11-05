angular.module("RidePlan.Services")
    .service("AuthService", function($http, $q, API_URL, API_PORT) {
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
                deferred.reject(data);
            });

            return deferred.promise;
        };
    });