'use strict';

/* jasmine specs for services go here */

describe('MotoNet', function() {
    describe('Services', function() {
        describe('LocationService', function() {
            var LocationService;

            beforeEach(module('MotoNet.Services'));
            beforeEach(inject(function (_LocationService_) {
                LocationService = _LocationService_;
            }));

            it('should exist', inject(function() {
                expect(LocationService).toBeDefined();
            }));

            describe("reverseLatLongLookup", function () {
                var mockValue = "Geocoder Result Location";

                it("should expect a string on return", inject(function() {

                }));
            });

            describe("isEventInRange", function () {

            })
        });
    })
});
