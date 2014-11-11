"use strict";

angular.module('RidePlan.Directives')
    .controller("GoogleAutocompleteController", function($scope) {
        var autoComplete;

        this.init = function(element) {
            var $element = $(element);

            autoComplete = new google.maps.places.Autocomplete(element);
            google.maps.event.addListener(autoComplete, 'place_changed', function() {
                var place = autoComplete.getPlace();
                if(place.geometry !== undefined) {
                    $scope.locationCoords = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.locationText = $element.val();
                    $scope.$apply();
                }
            });
        };
    })
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: "GoogleAutocompleteController",
            scope: {
                locationCoords: '=',
                locationText: '=?',
                required: '=?'
            },
            template: '<span>' +
                          '<input value="{{locationText}}" class="form-control" type="text" ng-required="{{required}}"/>' +
                          '<input value="{{locationCoords}}" type="hidden" />' +
                      '</span>',
            link: function ($scope, element, attrs, GoogleAutocompleteController) {
                GoogleAutocompleteController.init(element.children()[0]);
            }
        }
    });