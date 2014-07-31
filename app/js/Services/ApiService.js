angular.module("MotoNet.Services")
    .service("ApiService", function($http, ConfigProvider) {

        var config = ConfigProvider.getConfig();

        this.saveRideout = function(formData, callback) {
            $http
                .put(config.MOTONET_API_URL + '/events/postFormData/', formData)
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                })
                .error(function(data, status, headers, config) {
                    console.log("WRONG IT FAILED :( ");
                });
        }
    });