var expect = require('chai').expect;
var db = require('../../../db');
var task = require('../../../models/tasks');
var ObjectId = require('mongodb').ObjectId;
var collectionName = 'tasks';

describe('tasks test', function () {
    var sampleTasks;

    before(function (done) {
        db.connect('mongodb://localhost/mytestdb', done);
    });

    after(function () {
        db.close();
    });

    beforeEach(function (done) {
        sampleTasks = [
            {_id: new ObjectId('123412341200'), task: 'task1', createdBy: 'priya1', completed: 'Assigned'},
            {_id: new ObjectId('123412341201'), task: 'task2', createdBy: 'priya2', completed: 'Assigned'}
        ];

        db.get().collection(collectionName).insert(sampleTasks, done);
    });

    afterEach(function (done) {
        db.get().collection(collectionName).drop(done);
    });

    it('all should return all the tasks', function (done) {

        var callback = function (err, taskList) {
            expect(taskList[1]).to.be.eql(sampleTasks[0]);
            done();
        };

        task.allTasks(callback);
    });

    it('task should return null after adding task', function (done) {
        var sampleTask = {task: 'task3', createdBy: 'priya', completed: 'Assigned'};

        var callback = function (err) {

            var list = function (errors, taskList) {
                expect(taskList[0]).to.be.eql(sampleTask);
                done();
            };

            task.allTasks(list);
        };

        task.addTask(sampleTask, callback);
    });

    it('task should return error if new task is empty', function (done) {
        var newTask = {};
        var callback = function (err) {
            expect(err).to.be.eql('unable to create the task');
            done();
        };

        task.addTask(newTask, callback);
    });

    it('task should return error if task variable is empty', function (done) {
        var newTask = {createdBy: 'priya', completed: 'Assigned'};
        var callback = function (err) {
            expect(err).to.be.eql('unable to create the task');
            done();
        };

        task.addTask(newTask, callback);
    });

    it('task should return error if completed is empty', function (done) {
        var newTask = {task: 'task3', createdBy: 'priya'};
        var callback = function (err) {
            expect(err).to.be.eql('unable to create the task');
            done();
        };

        task.addTask(newTask, callback);
    });

    it('task should return error if createdBy is empty', function (done) {
        var newTask = {task: 'task3', completed: 'Assigned'};
        var callback = function (err) {
            expect(err).to.be.eql('unable to create the task');
            done();
        };

        task.addTask(newTask, callback);
    });

    it('task should return null if task is updated', function (done) {

        var callback = function (err) {
            var list = function (errors, taskList) {
                expect(taskList[0].completed).to.be.eql('Completed');
                done();
            };

            task.allTasks(list);
        };

        task.update(sampleTasks[1]._id.toString(), 'Completed', callback);
    });
});
