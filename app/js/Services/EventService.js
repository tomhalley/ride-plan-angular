"use strict";

/**
 * Service for Events
 */
angular.module("MotoNet.Services")
    .service("EventService", function($http, $q, MOTONET_API_URL, MOTONET_API_PORT, ApiService) {
        var allEvents = null;

        var searchCachedEventsById = function (id) {
            if(allEvents === null) {
                return false;
            }

            for(var i = 0; i < allEvents.length; i++) {
                if(allEvents[i]._id === id) {
                    return allEvents[i];
                }
            }

            return false;
        };

        this.validateFormData = function(eventData) {
            //@todo Add Logic for validating form data
            return true;
        };

        this.saveRideout = function(formData) {
            var deferred = $q.defer();

            $http.put(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/create/', { data: formData },
                { headers: {
                    'Authorization': ApiService.getSessionCookie()
                }})
                .success(function(data) {
                    allEvents.push(data);
                    deferred.resolve(allEvents);
                })
                .error(function(data, status) {
                    switch(status) {
                        default:
                            deferred.reject("Event could not be saved");
                            break;
                    }
                });

            return deferred.promise;
        };

        this.getRideoutById = function(id) {
            var deferred = $q.defer();

            var event = searchCachedEventsById(id);
            if(event !== false) {
                deferred.resolve(event);
            } else {
                $http.get(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/' + id, {},
                    { headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status) {
                        switch(status) {
                            default:
                                deferred.reject("Event could not be found");
                                break;
                        }
                    });
            }

            return deferred.promise;
        };

        /**
         * Retrieve all rideouts.
         * Checks for cached copy, then returns cached copy or ajax call
         *
         * @returns {promise|webdriver.promise.|document.promise|Promise.promise|Q.promise|webdriver.promise|*}
         */
        this.getAllRideouts = function() {
            var deferred = $q.defer();

            if(allEvents !== null) {
                deferred.resolve(allEvents);
            } else {
                $http.get(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/all/', {},
                    { headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }})
                    .success(function(data) {
                        allEvents = data;
                        deferred.resolve(data);
                    })
                    .error(function(data, status) {
                        switch(status) {
                            default:
                                deferred.reject("Events could not be retrieved");
                                break;
                        }
                    });
            }

            return deferred.promise;
        };

        /**
         * Save a users RSVP choice to an event
         *
         * @param eventId
         * @param rsvpBool
         * @returns {*}
         */
        this.saveUserRsvp = function(eventId, rsvpBool) {
            var deferred = $q.defer();

            if(eventId === null || eventId === undefined) {
                deferred.reject("Parameter 'eventId' was undefined");
            } else if (rsvpBool === null || rsvpBool === undefined) {
                deferred.reject("Parameter 'rsvpBool' was undefined");
            } else {
                $http.put(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/' + eventId + '/rsvp/',
                    { rsvpBool: rsvpBool},
                    { headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status) {
                        switch(status) {
                            default: deferred.reject("RSVP failed on event");
                                break;
                        }
                    });
            }

            return deferred.promise;
        };
    });