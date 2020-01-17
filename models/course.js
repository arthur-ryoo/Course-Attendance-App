const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  credit: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attendance: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Course', courseSchema);
