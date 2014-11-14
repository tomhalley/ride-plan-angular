"use strict";

describe('RidePlan', function() {
    describe('Services', function () {
        describe('AuthService', function() {
            var AuthService;

            beforeEach(module('RidePlan'));
            beforeEach(inject(function (_AuthService_) {
                AuthService = _AuthService_;
            }));

            it('should exist', inject(function() {
                should.exist(AuthService);
            }));

            describe('#getSessionCookie', function() {
                it("returns a session cookie if set");

                it("returns null if no session cookie is set");
            });

            describe("#authoriseUserAgainstApi", function() {
                it("throws an exception if accessToken is null");

                it("throws an exception is userId is null");

                it("returns a session cookie on success");

                it("throws an exception on api error");
            });
        });
    });
});