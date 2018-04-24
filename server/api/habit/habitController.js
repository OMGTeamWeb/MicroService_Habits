var Habit = require('./habitModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Habit.findById(id)
    .then(function(habit) {
      if (!habit) {
        next(new Error('There is no habit with that id'));
      } else {
        req.habit = habit;
        next();
      }
    },function(err) {
      next(err);
    });
};
exports.paramsbyUser = function(req, res, next, userId) {
  Habit.find({"userId": userId})
    .then(function(habit) {
      if (!habit) {
        next(new Error('There is no habit with that UserId'));
      } else {
        req.userId = habit;
        next();
      }
    },function(err) {
      next(err);
    });
};

exports.getbyUser = function(req, res, next){
  console.log(req.params)
  var userId = req.params.userId;
  console.log("ACA: "+ userId);
  if (!userId) {
    res.status(400).send({ error: "missing user Id" });
  }else{
    //{"userId": userId}
    Habit.find({"userId": userId})
    .then((habits) => {
      if(habits.length <= 0 ) {
        res.status(404).send({ error: "User "+req.userId+" not found :(" });
        return
      }
      res.json(habits);
    })
    .catch((err) =>{
      next(err);
    });
  }
};

exports.get = function(req, res, next) {
  Habit.find()
    .then(function(habits){
      res.json(habits);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var habit = req.habit;
  res.json(habit);
};



exports.put = function(req, res, next) {
  console.log("WOW "+ req.habit);
  var habit = req.habit;

  var update = req.body;

  _.merge(habit, update);

  habit.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};



exports.post = function(req, res, next) {
  var newhabit = req.body;
  console.log(newhabit);
  Habit.create(newhabit)
    .then(function(habit) {
      res.json(habit);
    }, function(err) {
      res.status(500).send({ error: "Something goes wrong :(" });
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.habit.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
