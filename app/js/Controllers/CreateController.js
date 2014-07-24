"use strict";

angular.module('MotoNet.Controllers')
    .controller("CreateController", function($scope, DirectionService) {
        $scope.map = {
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        console.log(map);
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

        $scope.addWaypoint = function() {
            $scope.waypoints.push({});
        };

        DirectionService.getGoogleApiResponse().success(function(data) {
            console.log(data);
        });
    });