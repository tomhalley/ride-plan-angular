"use strict";

angular.module('MotoNet.Controllers')
    .controller("CreateController", function($scope) {
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        $scope.waypoints = [];

        $scope.addWaypoint = function() {
            $scope.waypoints.push({});
        }
    });