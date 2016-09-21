var express = require('express');
var router = express.Router();
var users = require('../models/users');

router.get('/', function (req, res, next) {
    var callback = function (err, users) {
        if(err)
            res.send([{msg : err}]);
        else
            res.send(users);
    }
    users.allUsers(callback);
});

router.get('/getActiveUsers', function (req, res, next) {
    var callback = function (err, users) {
        if(err)
            res.send([{msg : err}]);
        else
            res.send(users);
    }
    users.getActiveUsers(callback);
});

router.post('/', function(req, res, next){
    var newUser = req.body;

    var callback = function (err) {
        if(err)
            res.send([{msg : err}]);
        else
            res.send([{msg : 'Team member added !!! '}]);
    }
    users.addUser(newUser, callback);
});

router.post('/enableDisableUser', function(req, res, next) {
  var user = req.body; 
  
  var callback = function(err) {
    if(err)
      res.send([{msg : err}]);
    else{
       if(user.active)
            res.send([{msg : 'Team member is now active !'}]);
        else
            res.send([{msg : 'Team member  is now inactive !'}]);
    }
  }

   users.update(user._id, user.active, callback);
});

module.exports = router;
