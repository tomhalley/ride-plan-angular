"use strict";

angular.module('RidePlan.Controllers')
    .controller('ModalController', function($scope, $modalInstance, FacebookAuthService) {
        $scope.methods = {
            loginFacebook: function() {
                FacebookAuthService.login(handleLoginResponse);
            },
            open: function() {

            },
            close: function() {
                $modalInstance.close($scope.data);
            }
        };
    });