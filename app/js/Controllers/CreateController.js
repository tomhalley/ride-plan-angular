"use strict";

angular.module('MotoNet.Controllers')
    .controller("CreateController", function($scope, ApiService) {

        $scope.error = false;
        $scope.eventName = '';
        $scope.origin = '';
        $scope.destination = '';
        $scope.waypoints = [];
        $scope.avoidTolls = false;
        $scope.avoidHighways = false;
        $scope.route = '';
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

        var updateRoute = function() {
            if($scope.origin == '' || $scope.destination == '') {
                return;
            }

            directionsService.route(directionsRequest, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $scope.route = response;
                    directionsDisplay.setDirections(response);
                } else {
                    console.log(response);
                }
            });
        };

        var updateWaypoints = function() {
            directionsRequest.waypoints = [];
            for(var i = 0; i < $scope.waypoints.length; i++) {
                if($scope.waypoints[i].location != '') {
                    directionsRequest.waypoints.push({
                        location: $scope.waypoints[i].location
                    });
                }
            }

            updateRoute();
        };

        var validateFormData = function() {
            return true;
        };

        $scope.$watch("origin", function() {
            directionsRequest.origin = $scope.origin;
            updateRoute();
        });

        $scope.$watch("destination", function() {
            directionsRequest.destination = $scope.destination;
            updateRoute();
        });

        $scope.$watch("waypoints", updateWaypoints, true);

        $scope.$watch("avoidTolls", function() {
            directionsRequest.avoidTolls = $scope.avoidTolls;
            updateRoute();
        });

        $scope.$watch("avoidHighways", function() {
            directionsRequest.avoidHighways = $scope.avoidHighways;
            updateRoute();
        });

        $scope.addWaypoint = function() {
            if($scope.waypoints.length < 8) {
                $scope.waypoints.push({
                    location: ''
                });
            } else {
                console.error("Maximum 8 waypoints reached!");
            }
        };

        $scope.removeWaypoint = function(waypoint) {
            $scope.waypoints.splice($scope.waypoints.indexOf(waypoint), 1);
            updateWaypoints();
        };

        $scope.submit = function() {
            var formObject = {
                eventName: $scope.eventName,
                origin: $scope.origin,
                destination: $scope.destination,
                waypoints: $scope.waypoints,
                route: $scope.route,
                avoidTolls: $scope.avoidTolls,
                avoidHighways: $scope.avoidHighways
            };

            var isValid = validateFormData(formObject);
            if(!isValid) {
                console.error("Error validating form");
                return;
            }

            ApiService.saveRideout(formObject);
        }
    });