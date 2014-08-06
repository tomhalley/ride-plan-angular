angular.module("MotoNet.Services")
    .service("ApiService", function(
        $http,
        $q,
        MOTONET_API_URL,
        MOTONET_API_PORT
        ) {

        this.authoriseUserAgainstApi = function(accessToken, userId) {
            var url = MOTONET_API_URL + ":" + MOTONET_API_PORT + "/user/authorise";

            return $http.post(url,  {
                    access_token: accessToken,
                    user_id: userId
                })
                .success(function(data) {
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

//
//        this.saveRideout = function(formData, callback) {
//            $http
//                .put(config.MOTONET_API_URL + '/events/postFormData/', formData)
//                .success(function(data, status, headers, config) {
//                    // this callback will be called asynchronously
//                    // when the response is available
//                })
//                .error(function(data, status, headers, config) {
//                    console.log("WRONG IT FAILED :( ");
//                });
//        }
    });