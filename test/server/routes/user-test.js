var expect = require('chai').expect;
var sinon = require('sinon');
var users = require('../../../models/users');
var express = require('express');

describe('user routes tests', function () {
    var sandbox;
    var router;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(express, 'Router').returns({
            get: sandbox.spy(),
            post: sandbox.spy()
        });

        router = require('../../../routes/users');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should register URI / for get', function () {
        expect(router.get.calledWith('/', sandbox.match.any)).to.be.true;
    });

    it('should register URI /getActiveUsers for get', function () {
        expect(router.get.calledWith('/getActiveUsers', sandbox.match.any)).to.be.true;
    });

    it('should register URI / for post', function () {
        expect(router.post.calledWith('/', sandbox.match.any)).to.be.true;
    });

    it('should register URI /enableDisableUser for post', function () {
        expect(router.post.calledWith('/enableDisableUser', sandbox.match.any)).to.be.true;
    });

    var stubResSend = function (expected, done) {
        return {
            send: function (data) {
                expect(data).to.be.eql(expected);
                done();
            }
        };
    };

    it("get / handler should call model's all & returns a result",
        function (done) {

            var sampleUser = [
                {_id: '123412341200', firs: 'John', last: 'Doe', active: true},
            ];

            sandbox.stub(users, 'allUsers', function (callback) {
                callback(null, sampleUser);
            });

            var req = {};
            var res = stubResSend(sampleUser, done);

            var registeredCallback = router.get.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post / handler should call model's addUser & returns success Object",
        function (done) {

            var sampleUser = {_id: '123412341200', firs: 'John', last: 'Doe', active: true};

            sandbox.stub(users, 'addUser', function (newUser, callback) {
                expect(newUser).to.be.eql(sampleUser);
                callback(null);
            });

            var req = { body:sampleUser };
            var res = stubResSend([{msg : 'Team member added !!! '}], done);

            var registeredCallback = router.post.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post /enableDisableUser handler should call model's enableDisableUser for active & returns success Object",
        function (done) {

            var sampleUser = {_id: '123412341200', active: true};

            sandbox.stub(users, 'update', function (id, active, callback) {
                expect(id).to.be.eql(sampleUser._id);
                expect(active).to.be.eql(sampleUser.active);
                callback(null);
            });

            var req = { body:sampleUser };
            var res = stubResSend([{msg : 'Team member is now active !'}], done);

            var registeredCallback = router.post.secondCall.args[1];
            registeredCallback(req, res);
        });

    it("post /enableDisableUser handler should call model's enableDisableUser for inactive & returns success Object",
        function (done) {

            var sampleUser = {_id: '123412341200', active: false};

            sandbox.stub(users, 'update', function (id, active, callback) {
                expect(id).to.be.eql(sampleUser._id);
                expect(active).to.be.eql(sampleUser.active);
                callback(null);
            });

            var req = { body:sampleUser };
            var res = stubResSend([{msg : 'Team member  is now inactive !'}], done);

            var registeredCallback = router.post.secondCall.args[1];
            registeredCallback(req, res);
        });

    it("get /getActiveUsers handler should call model's getActiveUsers & returns a result",
        function (done) {

            var sampleUser = [
                {_id: '123412341200', firs: 'John', last: 'Doe', active: true},
            ];

            sandbox.stub(users, 'getActiveUsers', function (callback) {
                callback(null, sampleUser);
            });

            var req = {};
            var res = stubResSend(sampleUser, done);

            var registeredCallback = router.get.secondCall.args[1];
            registeredCallback(req, res);
        });

    it("get / handler should return error if the model is not set properly",
        function (done) {

            sandbox.stub(users, 'allUsers', function (callback) {
                callback("Error message", null);
            });

            var req = {};
            var res = stubResSend([{msg: "Error message"}], done);

            var registeredCallback = router.get.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("get /getActiveUsers handler should return error if the model is not set properly",
        function (done) {

            sandbox.stub(users, 'getActiveUsers', function (callback) {
                callback("Error message", null);
            });

            var req = {};
            var res = stubResSend([{msg: "Error message"}], done);

            var registeredCallback = router.get.secondCall.args[1];
            registeredCallback(req, res);
        });

    it("post / handler should return error if the model is not set properly",
        function (done) {
            var sampleUser = {_id: '123412341200', firs: 'John', last: 'Doe', active: true};

            sandbox.stub(users, 'addUser', function (sampleUser, callback) {
                callback("Error message", null);
            });

            var req = {body:sampleUser};
            var res = stubResSend([{msg: "Error message"}], done);

            var registeredCallback = router.post.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post /enableDisableUser handler should return error if the model is not set properly",
        function (done) {
            var sampleUser = {_id: '123412341200', active: true};

            sandbox.stub(users, 'update', function (id, active, callback) {
                callback("Error message", null);
            });

            var req = {body:sampleUser};
            var res = stubResSend([{msg: "Error message"}], done);

            var registeredCallback = router.post.secondCall.args[1];
            registeredCallback(req, res);
        });

});