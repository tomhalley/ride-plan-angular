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

        $scope.waypoints = [];
        var waypointId = 0;
        $scope.addWaypoint = function() {
            $scope.waypoints.push({
                id: waypointId
            });
            waypointId++;
        };

        $scope.submit = function() {
            var formData = {
                name: $scope.eventName
            }
        }
    });