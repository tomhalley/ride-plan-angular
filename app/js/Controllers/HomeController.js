"use strict";

angular.module('MotoNet.Controllers')
    .controller("HomeController", function ($scope, $window, $location, EventService, LocationService) {

        var distances = [
            "5 miles",
            "15 miles",
            "25 miles",
            "50 miles"
        ];

        $scope.data = {
            distances: distances,
            currentLocation: null,
            selectedDistance: distances[0]
        };

        /**
         * Methods
         */
        $scope.methods = {
            selectDistance: function (selectedDistance) {
                $scope.data.selectedDistance = selectedDistance;
            },
            getLocation: function () {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    LocationService.reverseLatLongLookup(
                        position.coords.latitude,
                        position.coords.longitude,
                        function (result) {
                            $scope.$apply(function () {
                                $scope.data.currentLocation = result.formatted_address;
                            });
                        }
                    );
                });
            },
            gotoEvent: function(event) {
                $location.path("/event/" + event._id);
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