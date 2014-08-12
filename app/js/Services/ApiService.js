angular.module("MotoNet.Services")
    .service("ApiService", function($http, $q, MOTONET_API_URL, MOTONET_API_PORT) {
        var sessionCookie = null;

        this.authoriseUserAgainstApi = function(accessToken, userId) {
            return $http.post(MOTONET_API_URL + ":" + MOTONET_API_PORT + "/user/authoriseWithFacebook",  {
                access_token: accessToken,
                user_id: userId
            })
            .success(function(data) {
                sessionCookie = data;
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

        this.saveRideout = function(formData) {
            return $http.put(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/create/', formData, {
                headers: {
                    'Authorization': sessionCookie
                }
            })
            .success(function(data, status, headers, config) {
                return data;
            })
            .error(function(data, status, headers, config) {
                $q.reject("WRONG IT FAILED :( ");
            });
        }
    });