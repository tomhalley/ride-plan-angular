"use strict";

angular.module('MotoNet.Controllers')
    .controller("EventController", function($scope, $routeParams, EventService) {
        var id = $routeParams.id;

        var savedData = EventService.retrieveSavedEvent();
        if(savedData != null) {
            $scope.$broadcast("eventLoaded", savedData);
        } else {
            EventService.getRideoutById(id).then(function (data) {
                $scope.$broadcast("eventLoaded", data);
            });
        }

        /**
         * Initialise page after event load
         */
        $scope.$on("eventLoaded", function(event, data) {
            $scope.eventData = data.data;
        });

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
            zoom: 5
        };

        /**
         * Initialise Google Maps
         */
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: "",
            destination: "",
            waypoints: [],
            travelMode: google.maps.TravelMode.DRIVING,
            transitOptions: {
                departureTime: new Date(2014, 8, 1, 8, 0, 0),
                arrivalTime: new Date(2014, 8, 1, 18, 0, 0)
            },
            unitSystem: google.maps.UnitSystem.IMPERIAL
        };
    });