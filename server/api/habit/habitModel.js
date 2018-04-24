var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var habitSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  typeHabit: {
    type: String,
    required: true
  },
  difficult: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('habit', habitSchema);
