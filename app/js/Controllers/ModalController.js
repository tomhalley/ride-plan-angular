"use strict";

angular.module('RidePlan.Controllers')
    .controller('ModalController', function($scope, $rootScope, $modalInstance, FacebookAuthService) {
        $scope.methods = {
            loginFacebook: function() {
                FacebookAuthService.login()
                    .then(function(result) {
                        $rootScope.$broadcast('loggedIn', result);
                        $modalInstance.close();
                    });
            },
            close: function() {
                $modalInstance.close($scope.data);
            }
        };
    });