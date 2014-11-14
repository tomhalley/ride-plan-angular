'use strict';

/* jasmine specs for services go here */

describe('RidePlan', function() {
    describe('Services', function() {
        describe('LocationService', function() {
            var LocationService;

            beforeEach(module('RidePlan.Services'));
            beforeEach(inject(function (_LocationService_) {
                LocationService = _LocationService_;
            }));

            it('should exist', inject(function() {
                should.exist(LocationService);
            }));

            describe("#reverseLatLongLookup", function () {
                it("should expect a string on return");
            });

            describe("#isEventInRange", function () {

            })
        });
    })
});
