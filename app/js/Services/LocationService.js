"use strict";

/**
 * Location Service
 *
 * Used for location based things
 */
angular.module("MotoNet.Services")
    .service("LocationService", function () {

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
         * @returns {boolean}
         */
        this.isEventInRange = function (userLocation, event, range) {
            if (userLocation == null || userLocation == '') {
                return true;
            }

            var userLatLng = stringToLatLng(userLocation);

            // Origin
            if (distanceBetweenCoords(userLatLng, stringToLatLng(event.origin)) <= range) {
                return true;
            }

            // Waypoints
            for (var i = 0; i < event.waypoints.length; i++) {
                if (distanceBetweenCoords(userLatLng, stringToLatLng(event.waypoints[i].location)) <= range) {
                    return true;
                }
            }

            return false;
        }
    });