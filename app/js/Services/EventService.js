angular.module("MotoNet.Services")
    .service("EventService", function($http, $q, MOTONET_API_URL, MOTONET_API_PORT, ApiService) {
        var savedEventData = null;

        this.validateFormData = function(eventData) {
            //@todo Add Logic for validating form data
            return true;
        };

        this.retrieveSavedEvent = function() {
            var eventData = savedEventData;
            savedEventData = null;
            return eventData;
        };

        this.saveRideout = function(formData) {
            return $http.put(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/create/',
                {
                    data: formData
                },
                {
                    headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }
                })
                .success(function(data) {
                    savedEventData = data;
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
            return $http.get(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/' + id,
                {},
                {
                    headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }
                })
                .success(function(data) {
                    return data;
                })
                .error(function(data, status) {
                    switch(status) {
                        default:
                            $q.reject("Event could not be found");
                            break;
                    }
                });
        };

        this.getAllRideouts = function() {
            return $http.get(MOTONET_API_URL + ":" + MOTONET_API_PORT + '/events/all/',
                {},
                {
                    headers: {
                        'Authorization': ApiService.getSessionCookie()
                    }
                })
                .success(function(data) {
                    return data.data;
                })
                .error(function(data, status) {
                    switch(status) {
                        default:
                            $q.reject("Events could not be retrieved");
                            break;
                    }
                });
        }
    });