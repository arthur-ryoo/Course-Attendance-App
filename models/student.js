const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({ content: String });

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
  total_points: {
    type: Number,
    default: 0
  },
  comment: [commentSchema]
});

module.exports = mongoose.model('Student', studentSchema);
