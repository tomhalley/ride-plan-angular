"use strict";

angular.module('RidePlan.Directives')
    .controller("GoogleAutocompleteController", function($scope, LocationService) {
        var autoComplete,
            $element;

        var buildAddressFromPlace = function(place) {
            var addressParts = place.formatted_address.split(',');

            for(var i = 0; i < addressParts.length; i++) {
                if(addressParts[i] == addressParts[i + 1]) {
                    addressParts.splice(i, 1);
                }
            }

            addressParts.join(', ');
        };

        this.init = function(element) {
            $element = element[0];

            autoComplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autoComplete, 'place_changed', function() {
                var place = autoComplete.getPlace();
                if(place.geometry !== undefined) {
                    $scope.locationCoords = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.locationText = buildAddressFromPlace(place);
                    $scope.$apply();

                    $scope.$emit("locationTextChanged", angular.element($element).val());
                }
            });
        };

        $scope.$on("browserFoundLocation", function(event, data) {
            var service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: data.placeResults.formatted_address }, function(predictions, status) {
                if(status === google.maps.places.PlacesServiceStatus.OK) {
                    var locationString = predictions[0].description;
                    angular.element($element).val(locationString);
                    $scope.locationCoords = data.position.coords.latitude + ',' + data.position.coords.longitude;
                    $scope.$apply();

                    $scope.$emit("locationTextChanged", locationString);
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
                locationCoords: '=location',
                locationText: "=value"
            },
            template: '<input value="" type="text"/>',
            link: function ($scope, element, attrs, GoogleAutocompleteController) {
                GoogleAutocompleteController.init(element);
            }
        }
    });