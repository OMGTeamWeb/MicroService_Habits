var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/server');
var Habit = require('../server/api/habit/habitModel');

var should = chai.should();
chai.use(chaiHttp);

describe('Habit', function() {

  beforeEach(function(done){
    var newHabit = new Habit({
      userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      name: 'Read 10 minutes every day',
      typeHabit: 'Good',
      difficult: 'Medium',
      score: 30
    });
    newHabit.save(function(err) {
      done();
    });
  });


  it('should RETURN 404 user not found passing false id', function(done) {
    chai.request(server)
      .get('/api/habit/user/1')
      .end(function(err, res){
        console.log(res.body)
        res.should.have.status(404);
          done();
      });
  });
});
