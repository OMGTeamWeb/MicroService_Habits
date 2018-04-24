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

  it('should get all habits for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/habit/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].userId.should.equal('d290f1ee-6c54-4b01-90e6-d701748f0851');
        done();
      });
  });


  afterEach(function(done){
    Habit.collection.drop();
    done();
  });


  it('should add a new HABIT on /api/task POST', function(done) {
    chai.request(server)
      .post('/api/habit')
      .send({ "userId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "name": "Tomar Agua",
              "typeHabit": "Good",
              "difficult": "Easy",
              "score": 0})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('typeHabit');
        res.body.should.have.property('difficult');
        res.body.should.have.property('score');
        res.body.score.should.equal(0);
        done();
      });
  });

  it('should update an habits for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/habit/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        chai.request(server)
        .put('/api/habit/'+res.body[0]._id)
        .send({ "name": "Ha sido modificado"})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.name.should.equal('Ha sido modificado');
          done();
        });
      });
  });

  it('should DELETE an habit for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/habit/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        chai.request(server)
        .delete('/api/habit/'+res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
      });
  });
  it('should RETURN 404 user not found passing false id', function(done) {
    chai.request(server)
      .get('/api/habit/user/1')
      .end(function(err, res){
        res.should.have.status(404);
          done();
      });
  });
});
