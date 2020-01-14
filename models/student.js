const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  born: Date,
  year: Number
});

module.exports = mongoose.model('Student', studentSchema);
