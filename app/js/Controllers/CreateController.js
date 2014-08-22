"use strict";

angular.module('MotoNet.Controllers')
    .controller("CreateController", function($scope, $location, ApiService, EventService) {

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
         * Form Data
         */
        $scope.formData = {
            error: false,
            name: '',
            destination: '',
            waypoints: [],
            avoid_tolls: false,
            avoid_highways: false
        };

        /**
         * Form Methods
         */
        $scope.methods = {
            addWaypoint: function() {
                if($scope.formData.waypoints.length < 8) {
                    $scope.formData.waypoints.push({
                        location: ''
                    });
                } else {
                    console.error("Maximum 8 waypoints reached!");
                }
            },
            removeWaypoint: function(waypoint) {
                $scope.formData.waypoints.splice($scope.formData.waypoints.indexOf(waypoint), 1);
                updateWaypoints();
            },
            submit: function() {
                if(!EventService.validateFormData($scope.formData)) {
                    console.error("Error validating form");
                    return;
                }

                EventService.saveRideout($scope.formData)
                    .then(function(event) {
                        $location.path("/event/" + event.data._id);
                    });
            }
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

        /**
         * Update Route Rendered on Map
         */
        var updateRoute = function() {
            if($scope.formData.origin == '' || $scope.formData.destination == '') {
                return;
            }

            directionsService.route(directionsRequest, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    console.error(response);
                }
            });
        };

        /**
         * Update Route with Waypoints
         */
        var updateWaypoints = function() {
            directionsRequest.waypoints = [];
            for(var i = 0; i < $scope.formData.waypoints.length; i++) {
                if($scope.formData.waypoints[i].location != '') {
                    directionsRequest.waypoints.push({
                        location: $scope.formData.waypoints[i].location
                    });
                }
            }

            updateRoute();
        };

        /**
         * FormData Watches
         */
        $scope.$watch("formData.origin", function() {
            directionsRequest.origin = $scope.formData.origin;
            console.log("new origin: " + $scope.formData.origin);
            updateRoute();
        });

        $scope.$watch("formData.destination", function() {
            directionsRequest.destination = $scope.formData.destination;
            updateRoute();
        });

        $scope.$watch("formData.waypoints",updateWaypoints, true);

        $scope.$watch("formData.avoid_tolls", function() {
            directionsRequest.avoidTolls = $scope.formData.avoid_tolls;
            updateRoute();
        });

        $scope.$watch("formData.avoid_highways", function() {
            directionsRequest.avoidHighways = $scope.formData.avoid_highways;
            updateRoute();
        });
    });