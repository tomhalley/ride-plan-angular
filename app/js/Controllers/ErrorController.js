"use strict";

angular.module('RidePlan.Controllers')
    .controller("ErrorController", function($scope, $stateParams) {
        $scope.data = {
            message: '',
            code: $stateParams.code
        };

        switch($stateParams.code)
        {
            case '404':
                $scope.data.message = "The page could not be found :(";
                break;
            default:
                $scope.data.code = "Unknown Error";
                $scope.data.message = "An unknown error has occurred";
                break;
        }
    });
