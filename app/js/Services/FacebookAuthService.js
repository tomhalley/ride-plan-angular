"use strict";

/**
 * Facebook Auth Service
 *
 * Used to authenticate a user through Facebook and the API
 */
angular.module("RidePlan.Services")
    .service("FacebookAuthService", function() {
        FB.init({
            appId      : '1478417649072538',
            status     : true,
            xfbml      : true,
            version    : 'v2.0'
        });

        this.getLoginStatus = function(callback) {
            FB.getLoginStatus(function(response) {
                callback(response);
            })
        };

        this.login = function(callback) {
            FB.login(function(response) {
                callback(response);
            }, {scope: "public_profile,email"});
        };

        this.getUserDetails = function(callback) {
            FB.api('/me', function(response) {
                console.log(response);
                callback(response);
            });
        };

        this.logout = function(callback) {
            FB.logout(function(response) {
                callback();
            })
        }
    });