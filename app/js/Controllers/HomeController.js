"use strict";

angular.module('MotoNet.Controllers')
    .controller("HomeController", function ($scope, $window, $location, EventService, LocationService) {

        var distances = {
            10: "10 miles",
            15: "15 miles",
            25: "25 miles",
            50: "50 miles"
        };

        $scope.data = {
            distances: distances,
            currentLocation: null,
            selectedDistance: 10,
            selectedDistanceString: distances[10]
        };

        /**
         * Methods
         */
        $scope.methods = {
            gotoEvent: function(event) {
                $location.path("/event/" + event._id);
            },
            selectDistance: function (selectedDistance) {
                $scope.data.selectedDistance = selectedDistance;
                $scope.data.selectedDistanceString = distances[selectedDistance];
            },
            getLocation: function () {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    LocationService.reverseLatLongLookup(
                        position.coords.latitude,
                        position.coords.longitude,
                        function (result) {
                            $scope.$apply(function () {
                                $scope.data.searchLocation = result.formatted_address;
                            });
                        }
                    );
                });
            }
        };

        /**
         * Initialise page
         */
        EventService.getAllRideouts()
            .then(function (data) {
                $scope.data.events = data;
            });
    });