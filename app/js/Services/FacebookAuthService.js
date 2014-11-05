"use strict";

/**
 * Facebook Auth Service
 *
 * Used to authenticate a user through Facebook and the API
 */
angular.module("RidePlan.Services")
    .service("FacebookAuthService", ['$q', 'AuthService', 'Facebook', function($q, AuthService, Facebook) {
        /**
         * Generic function for handling connecting to facebook
         *
         * @param response
         * @returns {boolean}
         */
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

        /**
         * Get Facebook API login status
         *
         * @returns {*}
         */
        this.getLoginStatus = function() {
            var deferred = $q.defer();

            Facebook.getLoginStatus(function(response) {
                deferred.resolve(handleLoginResponse(response));
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
                deferred.resolve(handleLoginResponse(response));
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
    }]);