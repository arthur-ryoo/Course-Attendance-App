const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  born: {
    type: Date,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  total_point: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Student', studentSchema);
