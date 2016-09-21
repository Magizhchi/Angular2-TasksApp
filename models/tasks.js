var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

var collectionName = 'tasks';

module.exports = {
    allTasks: function (callback) {
        db.get().collection(collectionName).find().hint({$natural : -1}).toArray(callback);
    },

    addTask: function (newTask, callback) {
        var inserted = function (err) {
          if(!err)
              callback();
          }

        if(!newTask || newTask.task === undefined || newTask.completed === undefined || newTask.createdBy === undefined)
            callback('unable to create the task');
        else
            db.get().collection(collectionName).insertOne(newTask, inserted);
    },

    update: function(taskId, status, callback) {
        var updated = function(err, results) {
            if(!err)
              callback();
          }
         db.get().collection(collectionName).updateOne({"_id": new ObjectId.createFromHexString(taskId)} ,{ $set: { "completed" : status }}, updated);
    }
};
