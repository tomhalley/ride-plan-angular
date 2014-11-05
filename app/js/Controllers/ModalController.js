"use strict";

angular.module('RidePlan.Controllers')
    .controller('ModalController', function($scope, $rootScope, $modalInstance, FacebookAuthService) {
        $scope.methods = {
            loginFacebook: function() {
                $rootScope.$broadcast('facebookLoginClicked');
            },
            close: function() {
                $modalInstance.close($scope.data);
            }
        };
    });