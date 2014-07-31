angular.module("MotoNet.Common")
    .service("ConfigProvider", function(CONFIG) {
        var authToken;

        this.getConfig = function() {
            return CONFIG;
        };

        this.setAuthenticateToken = function(token) {
            authToken = token;
        };

        this.getAuthenticateToken = function() {

        }
    });