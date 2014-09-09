"use strict";

angular.module('MotoNet.Directives')
    .controller("GoogleAutocompleteController", function($scope, LocationService) {
        var autoComplete,
            $element;

        this.init = function(element) {
            $element = element[0];

            autoComplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autoComplete, 'place_changed', function() {
                var place = autoComplete.getPlace();
                if(place.geometry !== undefined) {
                    $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.$apply()
                }
            });
        };

        $scope.$on("browserFoundLocation", function(event, data) {
            var service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: data.placeResults.formatted_address }, function(predictions, status) {
                if(status === google.maps.places.PlacesServiceStatus.OK)  {
                    $($element).val(predictions[0].description);
                    $scope.location = data.position.coords.latitude + ',' + data.position.coords.longitude;
                    $scope.$apply()
                } else {
                    alert("Could not find your location");
                }
            });
        });
    })
    .directive('googleAutocomplete', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: "GoogleAutocompleteController",
            scope: {
                location: '=',
                value: '='
            },
            template: '<input type="text"/>',
            link: function ($scope, element, attrs, GoogleAutocompleteController) {
                GoogleAutocompleteController.init(element);
            }
        }
    });