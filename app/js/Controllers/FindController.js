"use strict";

angular.module('MotoNet.Controllers')
    .controller("FindController", function($scope, EventService) {
        $scope.data = {};

        EventService.getAllRideouts().then(function(data) {
            $scope.$broadcast("eventsLoaded", data);
        });

        $scope.$on("eventsLoaded", function(event, data) {
            $scope.data.events = data.data;
        });
    });