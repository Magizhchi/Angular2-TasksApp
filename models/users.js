var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

var collectionName = 'users';


module.exports = {
    allUsers: function (callback) {
        db.get().collection(collectionName).find().toArray(callback);
    },

    addUser: function (newUser, callback) {
        if (newUser.first != null && newUser.last != null && newUser.last.trim() != '' && newUser.first.trim() != '') {
            var countCallback = function (err, count) {

                if (!err && count <= 0) {
                    db.get().collection(collectionName).insertOne(newUser, callback);
                }
                else
                    callback('* Team member name should be unique.');
            }

            db.get().collection(collectionName).find({
                "first": newUser.first,
                "last": newUser.last
            }).count(countCallback);
        }
        else
            callback('* Team member first and last name cannot be blank. ');

    },

    update: function (userId, active, callback) {
        db.get().collection(collectionName).updateOne({"_id": new ObjectId.createFromHexString(userId)}, {$set: {"active": active}}, callback);
    },
    
    getActiveUsers: function (callback) {
        db.get().collection(collectionName).find({"active": true}).toArray(callback);
    }

};