"use strict";

/**
 * Facebook Auth Service
 *
 * Used to authenticate a user through Facebook and the API
 */
angular.module("RidePlan.Services")
    .service("FacebookAuthService", function($q, AuthService, Facebook, ErrorService) {
        /**
         * Generic function for handling connecting to facebook
         *
         * @param response
         * @returns {boolean}
         */
        var handleLoginResponse = function(response) {
            var deferred = $q.defer();

            if(response.status == "connected") {
                AuthService.authoriseUserAgainstApi(response.authResponse.accessToken, response.authResponse.userID)
                    .then(function() {
                        deferred.resolve();
                    }, function() {
                        ErrorService.error("Error", "Could not login at this time");
                        deferred.reject();
                    });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        /**
         * Get Facebook API login status
         *
         * @returns {*}
         */
        this.getLoginStatus = function() {
            var deferred = $q.defer();

            Facebook.getLoginStatus(function(response) {
                handleLoginResponse(response)
                    .then(function() {
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
            });

            return deferred.promise;
        };

        /**
         * Login via Facebooks API
         *
         * @returns {*}
         */
        this.login = function() {
            var deferred = $q.defer();

            Facebook.login(function(response) {
                handleLoginResponse(response)
                    .then(function() {
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
            }, {scope: "public_profile,email"});

            return deferred.promise;
        };

        /**
         * Logout via Facebooks API
         *
         * @returns {*}
         */
        this.logout = function() {
            var deferred = $q.defer();

            Facebook.logout(function(response) {
                deferred.resolve(true);
            });

            return deferred.promise;
        }
    });