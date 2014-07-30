"use strict";

angular.module('MotoNet.Directives')
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                location: '=',
                id: "=",
                class: "=",
                placeholder: "="
            },
            template: '<input type="text" class="form-control"/>',
            link: function ($scope, element, attrs) {
                var autoComplete = new google.maps.places.Autocomplete(element[0], {});
                google.maps.event.addListener(autoComplete, 'place_changed', function () {
                    var place = autoComplete.getPlace();
                    $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.$apply();
                });
            }
        }
    });