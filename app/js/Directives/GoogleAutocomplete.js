"use strict";

angular.module('MotoNet.Directives')
    .controller("GoogleAutocompleteController", function($scope) {
        var autoComplete;

        var handlePlaceChanged = function() {
            var place = autoComplete.getPlace();
            $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
            $scope.$apply();
        };

        this.init = function(element) {
            autoComplete = new google.maps.places.Autocomplete(element[0], {});
            google.maps.event.addListener(autoComplete, 'place_changed', handlePlaceChanged);
        };
    })
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: "GoogleAutocompleteController",
            scope: {
                location: '='
            },
            template: '<input type="text"/>',
            link: function ($scope, element, attrs, GoogleAutocompleteController) {
                GoogleAutocompleteController.init(element);
            }
        }
    });