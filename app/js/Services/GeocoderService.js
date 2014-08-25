"use strict";

angular.module("MotoNet.Services")
    .service("GeocoderService", function () {
        var geocoder = new google.maps.Geocoder();

        this.reverseLatLongLookup = function (latitude, longitude, callback) {
            var latLng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({'latLng': latLng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[1]);
                }
            })
        }
    });