"use strict";

angular.module('RidePlan')
    .service('ErrorService', function($rootScope, dialogs) {

        this.notification = function(message) {
            dialogs.notify("Notification", message);
        };

        this.error = function(title, message) {
            dialogs.error(title, message);
        };
    });