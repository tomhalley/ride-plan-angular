"use strict";

angular.module("MotoNet.Services")
    .service("LocationService", function () {
        var geocoder = new google.maps.Geocoder();

        var stringToLatLng = function(string) {
            var values = string.split(",");

            return {
                latitude: values[0],
                longitude: values[1]
            };
        };

        this.reverseLatLongLookup = function (latitude, longitude, callback) {
            var latLng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({'latLng': latLng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[1]);
                }
            })
        };

        var distanceBetweenCoords = function (LatLng1, LatLng2) {
            var R = 6371; // km (change this constant to get miles)
            var dLat = (LatLng2.latitude - LatLng1.latitude) * Math.PI / 180;
            var dLon = (LatLng2.longitude - LatLng1.longitude) * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(LatLng1.latitude * Math.PI / 180) * Math.cos(LatLng1.latitude * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            return d * 0.621371192;
        };

        this.isEventInRange = function(userLocation, event, range) {
            if(userLocation == null) {
                 return true;
            }

            var userLatLng = stringToLatLng(userLocation);

            // Origin
            if(distanceBetweenCoords(
                userLatLng,
                stringToLatLng(event.origin)
            ) <= range) {
                return true;
            }

            // Waypoints
            for(var i = 0; i < event.waypoints.length; i++) {
                if(distanceBetweenCoords(
                    userLatLng,
                    stringToLatLng(event.waypoints[i].location)
                ) <= range) {
                    return true;
                }
            }

            return false;
        }
    });