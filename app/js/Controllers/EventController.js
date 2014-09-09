"use strict";

angular.module('MotoNet.Controllers')
    .controller("EventController", function($scope, $routeParams, EventService) {
        var id = $routeParams.id,
            directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService();

        /**
         * Map Object
         */
        $scope.map = {
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        directionsDisplay.setMap(map)
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
                $scope.$broadcast("eventLoaded", data);
            });

        /**
         * Initialise page after event load
         */
        $scope.$on("eventLoaded", function(event, data) {
            $scope.eventData = data;

            /**
             * Initialise Google Maps
             */
            var directionsRequest = {
                origin: $scope.eventData.origin,
                destination: $scope.eventData.destination,
                waypoints: $scope.eventData.waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                transitOptions: {
                    departureTime: new Date(2014, 8, 1, 8, 0, 0),
                    arrivalTime: new Date(2014, 8, 1, 18, 0, 0)
                },
                unitSystem: google.maps.UnitSystem.IMPERIAL
            };

            directionsService.route(directionsRequest, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    console.error(response);
                }
            });
        });
    });