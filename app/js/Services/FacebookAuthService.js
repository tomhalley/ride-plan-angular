angular.module("MotoNet.Services")
    .service("FacebookAuthService", function() {
        FB.init({
            appId      : '1478753505705619',
            status     : true,
            xfbml      : true,
            version    : 'v2.0'
        });

        this.getLoginStatus = function(callback) {
            FB.getLoginStatus(function(response) {
                callback(response);
            })
        };

        this.signUserUp = function(callback) {

        }
    });