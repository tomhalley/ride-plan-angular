"use strict";

angular.module('RidePlan.Controllers')
    .controller('ModalController', function($scope, $rootScope, $modalInstance, FacebookAuthService) {

        $scope.methods = {
            loginFacebook: function() {
                FacebookAuthService.login()
                    .then(function() {
                        $modalInstance.close();
                        $rootScope.$broadcast('loggedIn', true);
                    }, function() {
                        $modalInstance.close();
                        $rootScope.$broadcast('loggedIn', false);
                    });
            },
            close: function() {
                $modalInstance.close($scope.data);
            }
        };
    });