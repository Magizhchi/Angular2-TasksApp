var expect = require('chai').expect;
var db = require('../../../db');
var users = require('../../../models/users');
var ObjectId = require('mongodb').ObjectId;
var collectionName = 'users';

describe('users test', function () {
    var sampleUsers;

    before(function (done) {
        db.connect('mongodb://localhost/mytestdb', done);
    });

    after(function () {
        db.close();
    });

    beforeEach(function (done) {
        sampleUsers = [
            {_id: new ObjectId('123412341200'), first: 'Priya', last: 'Kumari', active: true},
            {_id: new ObjectId('123412341201'), first: 'Priya1', last: 'Kumari', active: false},
            {_id: new ObjectId('123412341203'), first: 'Priya3', last: 'Kumari', active: false},
        ];

        db.get().collection(collectionName).insert(sampleUsers, done);
    });

    afterEach(function (done) {
        db.get().collection(collectionName).drop(done);
    });

    it('all should return all the tasks', function (done) {

        var callback = function (err, userList) {
            expect(userList[0]).to.be.eql(sampleUsers[0]);
            done();
        };

        users.allUsers(callback);
    });

    it('getActiveUsers should return only active users', function (done) {

        var callback = function (err, userList) {
            expect(Object.keys(userList).length).to.be.eql(1);
            done();
        };

        users.getActiveUsers(callback);
    });

    it('user should return null if task is updated', function (done) {

        var callback = function (err) {
            var list = function (errors, userList) {
                expect(userList[1].active).to.be.eql(true);
                done();
            };

            users.allUsers(list);
        };

        users.update(sampleUsers[1]._id.toString(), true, callback);
    });

    it('user should return error if first is not present', function (done) {
        var newuser = {last: 'Kumari', active: true};
        var callback = function (err) {
            expect(err).to.be.eql('* Team member first and last name cannot be blank. ');
            done();
        };

        users.addUser(newuser, callback);
    });

    it('user should return error if last is not present', function (done) {
        var newuser = {first: 'Priya', active: true};
        var callback = function (err) {
            expect(err).to.be.eql('* Team member first and last name cannot be blank. ');
            done();
        };

        users.addUser(newuser, callback);
    });

    it('user should return error if last contains only spaces', function (done) {
        var newuser = {first: 'Priya', last: '   ', active: true};
        var callback = function (err) {
            expect(err).to.be.eql('* Team member first and last name cannot be blank. ');
            done();
        };

        users.addUser(newuser, callback);
    });

    it('user should return error if first contains only spaces', function (done) {
        var newuser = {first: '   ', last: 'Kumari', active: true};
        var callback = function (err) {
            expect(err).to.be.eql('* Team member first and last name cannot be blank. ');
            done();
        };

        users.addUser(newuser, callback);
    });


    it('user should return error if first last together is not unique', function (done) {
        var newuser = {first: 'Priya', last: 'Kumari', active: true};
        var callback = function (err) {
            expect(err).to.be.eql('* Team member name should be unique.');
            done();
        };

        users.addUser(newuser, callback);
    });


    it('addUser adds an user succesfully', function (done) {
        var newuser = {first: 'Priya55', last: 'Kumari', active: true};

        var callback = function (err) {
            var list = function (errors, userList) {
                expect(userList[3].first).to.be.eql(newuser.first);
                done();
            };

            users.allUsers(list);
        };

        users.addUser(newuser, callback);
    });

});
