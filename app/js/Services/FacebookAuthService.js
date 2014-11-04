"use strict";

/**
 * Facebook Auth Service
 *
 * Used to authenticate a user through Facebook and the API
 */
angular.module("RidePlan.Services")
    .service("FacebookAuthService", function($q) {
        var handleLoginResponse = function(response) {
            if(response.status == "connected") {
                AuthService.authoriseUserAgainstApi(
                    response.authResponse.accessToken,
                    response.authResponse.userID
                );

                return true;
            }

            return false;
        };

        FB.init({
            appId      : '1478417649072538',
            status     : true,
            xfbml      : true,
            version    : 'v2.0'
        });

        this.getLoginStatus = function() {
            FB.getLoginStatus(function(response) {
                handleLoginResponse(response);
            })
        };

        this.login = function() {
            FB.login(function(response) {
                handleLoginResponse(response);
            }, {scope: "public_profile,email"});
        };

        this.logout = function() {
            FB.logout(function(response) {
                handleLoginResponse(response);
            })
        }
    });