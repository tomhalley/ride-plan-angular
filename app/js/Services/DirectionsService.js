"use strict";

angular.module('MotoNet.Services', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['X-XSS-Protection'];
    })
    .service('DirectionService', function($http) {
        this.getGoogleApiResponse = function() {
            return $http({
                dataType: "json",
                method: "GET",
                url: "http://maps.googleapis.com/maps/api/directions/json",
                params: {
                    origin: "Guildford",
                    destination: "Brighton",
                    key: "AIzaSyBWuYgeB2ELhf8YNTwwRqzDY_r3gTGVBIc"
                }
            })
        }
    });