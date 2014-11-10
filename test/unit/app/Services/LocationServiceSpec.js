'use strict';

var google =


/* jasmine specs for services go here */

describe('RidePlan', function() {
    describe('Services', function() {
        describe('LocationService', function() {
            var LocationService,
                mockGoogle;

            beforeEach(module('RidePlan.Services'));
            beforeEach(inject(function (_LocationService_) {
                LocationService = _LocationService_;
            }));

            it('should exist', inject(function() {
                expect(LocationService).toBeDefined();
            }));

            describe("reverseLatLongLookup", function () {
                it("should expect a string on return", inject(function() {

                }));
            });

            describe("isEventInRange", function () {

            })
        });
    })
});
