"use strict";

describe('RidePlan', function() {
    describe('Services', function () {
        describe('EventService', function() {
            var EventService;

            beforeEach(module('RidePlan'));
            beforeEach(inject(function (_EventService_) {
                EventService = _EventService_;
            }));

            describe('#validateFormData', function() {
                var formData;

                beforeEach(function(){
                    formData = {

                    };
                })

                it("should return a mesage if name is missing", function() {
                    EventService.validateFormData
                });

                it("should return a mesage if start time is missing");
                it("should return a mesage if start time is invalid");
                it("should return a mesage if end time is missing");
                it("should return a mesage if end time is invalid");
                it("should return a mesage if is_private is not set");
                it("should return a mesage if origin is missing");
                it("should return a mesage if destination is missing");
                it("should return a mesage if avoid_tolls is missing");
                it("should return a mesage if avoid_highways is missing");
                it("should return true if form data is valid");
            });

            describe('#saveRideout', function() {

            });

            describe('#getRideoutById', function() {

            });

            describe('#getAllRideouts', function() {

            });

            describe('#saveUserRsvp', function() {

            });
        })
    });
});