"use strict";

angular.module("MotoNet.Services")
    .service("LocationService", function () {
        var geocoder = new google.maps.Geocoder();

        this.reverseLatLongLookup = function (latitude, longitude, callback) {
            var latLng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({'latLng': latLng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[1]);
                }
            })
        };

        this.distanceBetweenCoords = function (LatLng1, LatLng2) {
            var R = 6371; // km (change this constant to get miles)
            var dLat = (LatLng2.latitude - LatLng1.latitude) * Math.PI / 180;
            var dLon = (LatLng2.longitude - LatLng1.longitude) * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            if (d > 1) {
                return Math.round(d) + "km";
            } else if (d <= 1) {
                return Math.round(d * 1000) + "m";
            }

            return d;
        }
    });