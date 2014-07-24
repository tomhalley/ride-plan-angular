"use strict";

angular.module('MotoNet.Services', [])
    .config(function($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .service('DirectionService', function($http) {
        this.getGoogleApiResponse = function() {
            return $http({
                dataType: "jsonp",
                method: "GET",
                url: "http://maps.googleapis.com/maps/api/directions/nav?origin=Guildford&destination=Brighton",
            })
        }
    });