"use strict";

angular.module('MotoNet.Directives')
    .controller("GoogleAutocompleteController", function($scope) {
        var autoComplete,
            $element,
            initialising = true;

        this.init = function(element) {
            $element = element[0];

            autoComplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autoComplete, 'place_changed', handlePlaceChanged);
        };

        var handlePlaceChanged = function() {
            var place = autoComplete.getPlace();

            if(place !== undefined) {
                $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
            } else {
                getFirstPrediction($scope.search);
            }
        };

        var getFirstPrediction = function(searchString) {
            var service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: searchString }, function(predictions, status) {
                if(status === google.maps.places.PlacesServiceStatus.OK)  {
                    $($element).val(predictions[0].description);
                } else {
                    //Todo Throw error
                }
            });
        };

        $scope.$watch("search", function() {
            if(initialising === false) {
                handlePlaceChanged();
            }

            initialising = false;
        });
    })
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: "GoogleAutocompleteController",
            scope: {
                location: '=',
                search: '=',
                value: '='
            },
            template: '<input type="text"/>',
            link: function ($scope, element, attrs, GoogleAutocompleteController) {
                GoogleAutocompleteController.init(element);
            }
        }
    });