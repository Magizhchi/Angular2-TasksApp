var expect = require('chai').expect;
var sinon = require('sinon');
var tasks = require('../../../models/tasks');
var express = require('express');

describe('task routes tests', function () {
    var sandbox;
    var router;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(express, 'Router'). returns({
            get: sandbox.spy(),
            post: sandbox.spy()
        });

        router = require('../../../routes/tasks');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should Register URI / for get', function () {
        expect(router.get.calledWith('/', sandbox.match.any)).to.be.true;
    });

    it('should Register URI / for post', function () {
        expect(router.post.calledWith('/', sandbox.match.any)).to.be.true;
    });

    it('should Register URI / for get', function () {
        expect(router.post.calledWith('/update', sandbox.match.any)).to.be.true;
    });

    var stubResSend = function (expected, done) {
        return {
            send: function (data) {
                expect(data).to.be.eql(expected);
                done();
            }
        };
    };

    it("get / handler should call model's allTasks & returns a result",
        function (done) {

            var taskList = [
                {task: 'OK Kanmani', createdby: 'Karthikk', completed: 'Assigned'},
            ];

            sandbox.stub(tasks, 'allTasks', function (callback) {
                callback(null, taskList);
            });

            var req = {};
            var res = stubResSend(taskList, done);

            var registeredCallback = router.get.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post / handler should call model's addTask & returns a result",
        function (done) {

            var task = {task: 'OK Kanmani', createdby: 'Karthikk', completed: 'Assigned'};

            sandbox.stub(tasks, 'addTask', function (newTask, callback) {
                expect(newTask).to.be.eql(task);
                callback(null);
            });

            var req = {body:task};
            var res = stubResSend([{msg : 'New task added !'}], done);

            var registeredCallback = router.post.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post /update handler should call model's update & returns a result",
        function (done) {

            var task = {_id: '123412341200', task: 'OK Kanmani', createdby: 'Karthikk', completed: 'Assigned'};

            sandbox.stub(tasks, 'update', function (id, completed, callback) {
                expect(id).to.be.eql(task._id);
                expect(completed).to.be.eql(task.completed);
                callback(null);
            });

            var req = {body:task};
            var res = stubResSend([{msg : 'Task updated !'}], done);

            var registeredCallback = router.post.secondCall.args[1];
            registeredCallback(req, res);
        });

    it("get / handler should return error if the model is not set properly",
        function (done) {

            sandbox.stub(tasks, 'allTasks', function (callback) {
                callback("Error message", null);
            });

            var req = {};
            var res = stubResSend([{msg :'*** Error getting the tasks'}], done);

            var registeredCallback = router.get.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post / handler should return error if the model is not set properly",
        function (done) {
            var task = {_id: '123412341200', task: 'OK Kanmani', createdby: 'Karthikk', completed: 'Assigned'};

            sandbox.stub(tasks, 'addTask', function (task, callback) {
                callback("Error message", null);
            });

            var req = {body:task};
            var res = stubResSend([{msg : '*** Unable to add task'}], done);

            var registeredCallback = router.post.firstCall.args[1];
            registeredCallback(req, res);
        });

    it("post /update handler should return error if the model is not set properly",
        function (done) {
            var task = {_id: '123412341200', task: 'OK Kanmani', createdby: 'Karthikk', completed: 'Assigned'};

            sandbox.stub(tasks, 'update', function (id, completed, callback) {
                callback("Error message", null);
            });

            var req = {body:task};
            var res = stubResSend([{msg : '**** Unable to update task'}], done);

            var registeredCallback = router.post.secondCall.args[1];
            registeredCallback(req, res);
        });

})