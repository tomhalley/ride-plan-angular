"use strict";

describe('RidePlan', function() {
    describe('Services', function () {
        describe('ErrorService', function () {
            var AuthService;

            beforeEach(module('RidePlan'));
            beforeEach(inject(function (_AuthService_) {
                AuthService = _AuthService_;
            }));

            describe('#notification', function() {
                it("opens a notification dialog");
            });

            describe('#error', function() {
                it("opens an error dialog");
            });
        });
    });
});