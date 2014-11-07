"use strict";

angular.module('RidePlan.Controllers')
    .controller("EventController", function($scope, $stateParams, EventService, ErrorService, $location) {
        var id = $stateParams.id,
            directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService();

        $scope.methods = {
            rsvpUpdate: function(status) {
                EventService.saveUserRsvp(id, status)
                    .then(function() {
                        console.log("RSVP Status updated");
                    }, function() {
                        ErrorService.error("Error", "Unable to update RSVP at this time");
                    });
            }
        };

        /**
         * Map Object
         */
        $scope.map = {
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        directionsDisplay.setMap(map);
                    });
                }
            },
            center: {
                latitude: 54.5,
                longitude: -4.5
            },
            options: {
                streetViewControl: false,
                overviewMapControl: false,
                scaleControl: false,
                panControl: false,
                zoomControl: false,
                scrollwheel: false,
                mapTypeControl: false,
                rotateControl: false,
                keyboardShortcuts: false
            },
            draggable: false,
            zoom: 5
        };

        EventService.getRideoutById(id)
            .then(function (data) {
                $scope.data = data;

                /**
                 * Initialise Google Maps
                 */
                var directionsRequest = {
                    origin: data.origin.location,
                    destination: data.destination.location,
                    waypoints: data.waypoints,
                    travelMode: google.maps.TravelMode.DRIVING,
                    transitOptions: {
                        departureTime: new Date(2014, 8, 1, 8, 0, 0),
                        arrivalTime: new Date(2014, 8, 1, 18, 0, 0)
                    },
                    unitSystem: google.maps.UnitSystem.IMPERIAL
                };

                directionsService.route(directionsRequest, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    } else {
                        console.error(response);
                    }
                });
            }, function() {
                $location.path("error/404");
            });
    });