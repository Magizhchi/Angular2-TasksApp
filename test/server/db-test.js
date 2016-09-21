var expect = require('chai').expect;
var db = require('../../db');

describe('db tests', function () {
    it('canary test should pass',function () {
        expect(true).to.be.true;
    });

    it('get should return null by default', function () {
        expect(db.get()).to.be.null;
    });

    it('close should set connection to null', function () {
        db.close();
        expect(db.get()).to.be.null;
    });

    it('db closes the connection', function (done) {
        db.connection = {
            close: function () { done(); }
        }
        db.close();
    });

    it('connect should set connection for good db name', function (done) {
        var callback = function (err) {
            expect(err).to.be.null;
            expect(db.get().databaseName).to.be.eql('mytestdb');
            done();
        }
        db.connect('mongodb://localhost/mytestdb', callback);
    });

    it('connect should fail for incorrect protocol', function (done) {
        var callback = function (err) {
            expect(err.message).to.be.eql('invalid schema, expected mongodb');
            done();
        }

        db.connect('invalid://localhost/mytestdb', callback);
    });
});