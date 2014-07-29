"use strict";

angular.module('MotoNet.Controllers')
    .controller("CreateController", function($scope) {

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        var directionsRequest = {
            origin: "",
            destination: "",
            travelMode: google.maps.TravelMode.DRIVING,
            transitOptions: {
                departureTime: new Date(2014, 8, 1, 8, 0, 0),
                arrivalTime: new Date(2014, 8, 1, 18, 0, 0)
            },
            unitSystem: google.maps.UnitSystem.IMPERIAL
        };

        var updateRoute = function() {
            directionsService.route(directionsRequest, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    console.log(response);
                }
            });
        };

        updateRoute();



        $scope.map = {
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        directionsDisplay.setMap(map)
                    });
                }
            },
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        $scope.waypoints = [];

        $scope.origin = '';
        $scope.$watch("origin", function() {
            directionsRequest.origin = $scope.origin;
            updateRoute();
        });

        $scope.destination = '';
        $scope.$watch("destination", function() {
            directionsRequest.destination = $scope.destination;
            updateRoute();
        });

        $scope.addWaypoint = function() {
            $scope.waypoints.push({});
        };
    });