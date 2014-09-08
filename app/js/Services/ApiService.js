angular.module("MotoNet.Services")
    .service("ApiService", function($http, $q, MOTONET_API_URL, MOTONET_API_PORT) {
        var sessionCookie = null;

        this.getSessionCookie = function() {
            return sessionCookie;
        };

        this.authoriseUserAgainstApi = function(accessToken, userId) {
            return $http.post(MOTONET_API_URL + ":" + MOTONET_API_PORT + "/user/authoriseWithFacebook",  {
                access_token: accessToken,
                user_id: userId
            })
            .success(function(data) {
                sessionCookie = JSON.parse(data);
                return data;
            })
            .error(function(data, status) {
                switch(status) {
                    default:
                        $q.reject("Unable to authorize user");
                        break;
                }
            })
        };
    });