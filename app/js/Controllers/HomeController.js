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
            isFindingLocation: false,
            currentLocation: null,
            currentLocationText: null,
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
                $scope.data.isFindingLocation = true;
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.data.currentLocation = position.coords.latitude + ',' + position.coords.longitude;
                    LocationService.reverseLatLongLookup(
                        position.coords.latitude,
                        position.coords.longitude,
                        function (result) {
                            $scope.data.isFindingLocation = false;
                            $scope.$broadcast("browserFoundLocation", {
                                placeResults: result,
                                position: position
                            });
                        }
                    );
                });
            },
            focusOnRange: function() {
                $("#location-range").toggleClass("open");
            },
            focusOnSearch: function() {
                console.log($scope.data.currentLocationText);
                angular.element("#location-search").focus();
            }
        };

        $scope.$on("locationTextChanged", function(event, string) {
            $scope.data.currentLocationText = string;
            $scope.$apply();
        });

        /**
         * Initialise page
         */
        EventService.getAllRideouts()
            .then(function (data) {
                $scope.data.events = data;
            });
    });