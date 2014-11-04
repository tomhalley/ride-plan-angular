"use strict";

angular.module('RidePlan.Controllers')
    .controller("HomeController", ['$scope', '$location', 'EventService', 'LocationService', function ($scope, $location, EventService, LocationService) {
        var distances = {
            0: "All",
            10: "10 miles",
            15: "15 miles",
            25: "25 miles",
            50: "50 miles"
        };

        $scope.data = {
            events: [],
            initialising: true,
            distances: distances,
            isFindingLocation: false,
            currentLocation: null,
            currentLocationText: null,
            selectedDistance: 0,
            selectedDistanceString: distances[0]
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
                LocationService.getUserLocation()
                    .then(function(position) {
                        $scope.data.currentLocation = position.coords.latitude + ',' + position.coords.longitude;
                        LocationService.reverseLatLongLookup(
                            position.coords.latitude,
                            position.coords.longitude,
                            function (result) {
                                $scope.$broadcast("browserFoundLocation", {
                                    placeResults: result,
                                    position: position
                                });

                                EventService.getAllRideouts()
                                    .then(function (data) {
                                        $scope.data.events = LocationService.updateEventRanges(data, $scope.data.currentLocation);
                                        $scope.data.initialising = false;
                                        $scope.data.isFindingLocation = false;
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

        $scope.$watch("data.currentLocation", function() {
            $scope.data.events = LocationService.updateEventRanges(
                $scope.data.events,
                $scope.data.currentLocation
            );
        });

        $scope.$on("locationTextChanged", function(event, string) {
            $scope.data.currentLocationText = string;
            $scope.$apply();
        });

        $scope.methods.getLocation();
    }]);