"use strict";

angular.module('MotoNet.Filters')
    .filter('Distance', function (LocationService) {
        return function(events, userLocation, range) {
            if(events == undefined) {
                return [];
            }

            var eventsInRange = [];
            for(var i = 0; i < events.length; i++) {
                var isInRange = LocationService.isEventInRange(
                    userLocation,
                    events[i],
                    range
                );

                if(isInRange) {
                    eventsInRange.push(events[i]);
                }
            }
            console.log(eventsInRange);

            return eventsInRange;
        }
    });