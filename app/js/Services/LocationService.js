"use strict";

/**
 * Location Service
 *
 * Used for location based things
 */
angular.module("RidePlan.Services")
    .service("LocationService", ['$q', '$window', function ($q, $window) {

        /**
         * Convert LatLng string to object
         *
         * @param string
         * @returns {{latitude: (*|string|undefined), longitude: (*|string|undefined)}}
         */
        var stringToLatLng = function (string) {
            var values = string.split(",");

            return {
                latitude: values[0],
                longitude: values[1]
            };
        };

        /**
         * Mathssss
         *
         * @param LatLng1
         * @param LatLng2
         * @returns {number}
         */
        var distanceBetweenCoords = function (LatLng1, LatLng2) {
            var radiusOfEarth = 3963.1676;
            var dLat = (LatLng2.latitude - LatLng1.latitude) * Math.PI / 180;
            var dLon = (LatLng2.longitude - LatLng1.longitude) * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(LatLng1.latitude * Math.PI / 180) * Math.cos(LatLng1.latitude * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return radiusOfEarth * c;
        };

        /**
         * Find nearest location/address to coordinates
         *
         * @param latitude
         * @param longitude
         * @param callback
         */
        this.reverseLatLongLookup = function (latitude, longitude, callback) {
            var latLng = new google.maps.LatLng(latitude, longitude);
            (new google.maps.Geocoder()).geocode({'latLng': latLng}, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[1]);
                }
            })
        };

        /**
         * Returns bool of whether an event is in range of a location
         *
         * @param userLocation
         * @param event
         * @param range
         */
        this.isEventInRange = function (userLocation, event, range) {
            if (userLocation == null || userLocation == '') {
                return true;
            }

            var userLatLng = stringToLatLng(userLocation);

            // Origin
            var originDistance = distanceBetweenCoords(userLatLng, stringToLatLng(event.origin));
            if (originDistance <= range) {
                return originDistance;
            }

            if(range == 0) {
                return originDistance;
            }

            return false;
        };

        /**
         * Calculates the range for each event and passes it back as a property of that event
         *
         * @param events
         * @param userLocation
         */
        this.updateEventRanges = function(events, userLocation) {
            if(userLocation === null ) {
                return events;
            }

            var userLatLng = stringToLatLng(userLocation);

            for(var i = 0; i < events.length; ++i) {
                var originLatLng = stringToLatLng(events[i].origin);
                events[i].range = distanceBetweenCoords(userLatLng, originLatLng).toFixed(1);
            }
            return events;
        };

        /**
         * Returns a users location
         *
         * @returns {promise}
         */
        this.getUserLocation = function() {
            var deferred = $q.defer();

            $window.navigator.geolocation.getCurrentPosition(function (position) {
                deferred.resolve(position);
            });

            return deferred.promise;
        }
    }]);