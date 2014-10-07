angular.module("MotoNet.Services")
    .service("EventService", function($http, $q, MOTONET_API_URL, MOTONET_API_PORT, ApiService) {
        var allEvents = null;

        var searchCachedEventsById = function (id) {
            if(allEvents === null) {
                return false;
            }

            for(var i = 0; i < allEvents.length; i++) {
                if(allEvents[i]._id == id) {
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
            return $http.put(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/create/', { data: formData },
                { headers: {
                    'Authorization': ApiService.getSessionCookie()
                }})
                .success(function(data) {
                    allEvents.push(data);
                    return data;
                })
                .error(function(data, status) {
                    switch(status) {
                        default:
                            $q.reject("Event could not be saved");
                            break;
                    }
                });
        };

        this.getRideoutById = function(id) {
            var deferred = $q.defer();

            var event = searchCachedEventsById(id);
            if(event != false) {
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
                $http.get(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/', {},
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
        }
    });