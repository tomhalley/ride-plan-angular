"use strict";

var google = {
    maps: {
        Geocoder: function() {
            this.geocode = function(object, callback) {
                callback("OK", ["Geocoder Result Location"]);
            };
        }
    }
};