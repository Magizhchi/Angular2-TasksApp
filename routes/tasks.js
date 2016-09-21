var express = require('express');
var router = express.Router();
var tasks = require('../models/tasks');

router.get('/', function (req, res, next) {
    var callback = function (err, taskList) {
        if(err)
            res.send([{msg :'*** Error getting the tasks'}]);
        else
            res.send(taskList);
    }
    tasks.allTasks(callback);
});

router.post('/', function(req, res, next){
    var newTask = req.body;
    var callback = function (err) {
        if(err)
            res.send([{msg : '*** Unable to add task'}]);
        else
            res.send([{msg : 'New task added !'}]);
    }
    tasks.addTask(newTask, callback);
});


router.post('/update', function(req, res, next) {
  var task = req.body; 

  var callback = function(err) {
    if(err)
      res.send([{msg : '**** Unable to update task'}]);
    else
      res.send([{msg : 'Task updated !'}]);
  }
  
   tasks.update(task._id, task.completed, callback);
});

module.exports = router;
