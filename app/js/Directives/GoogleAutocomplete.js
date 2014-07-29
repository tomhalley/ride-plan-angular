"use strict";

angular.module('MotoNet.Directives')
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            // transclude:true,
            scope: {
                location: '=',
                id: "=",
                class: "="
            },
            template: '<input type="text" class="form-control" placeholder="Origin"/>',
            link: function ($scope, element, attrs) {
                var autocomplete = new google.maps.places.Autocomplete(element[0], {});
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.$apply();
                });
            }
        }
    });