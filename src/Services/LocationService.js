"use strict";

/**
 * Location Service
 *
 * Used for location based things
 */
angular.module("RidePlan.Services")
    .service("LocationService", ['$q', '$window', function ($q, $window) {

        var cachedLocation = null;

        /**
         * Builds a coherent string to use in the search bar
         * @param place
         */
        var buildAddressFromPlace = function(place) {
            var addressParts = place.formatted_address.split(',');

            for(var i = 0; i < addressParts.length; i++) {
                if(addressParts[i] == addressParts[i + 1]) {
                    addressParts.splice(i, 1);
                }
            }

            return addressParts.join(', ');
        };

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
            var originDistance = distanceBetweenCoords(userLatLng, stringToLatLng(event.origin.location));
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
                var originLatLng = stringToLatLng(events[i].origin.location);
                events[i].range = distanceBetweenCoords(userLatLng, originLatLng).toFixed(1);
            }
            return events;
        };

        /**
         * Returns a users location
         *
         * @returns {promise}
         */
        this.getUserLocation = function(forceRefresh) {
            var deferred = $q.defer();

            if(cachedLocation !== null && forceRefresh !== true) {
                deferred.resolve(cachedLocation);
            } else {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    var latLng = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    var geoCoder = new google.maps.Geocoder();
                    geoCoder.geocode({'latLng': latLng}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {

                            cachedLocation = {
                                location: position.coords.latitude + ',' + position.coords.longitude,
                                locationText: buildAddressFromPlace(results[1])
                            };

                            deferred.resolve(cachedLocation);
                        } else {
                            deferred.reject("Unable to retrieve user location");
                        }
                    })

                });
            }

            return deferred.promise;
        }
    }]);