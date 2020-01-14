const Student = require('../models/student');
const Course = require('../models/course');

function newStudent(req, res) {
  Student.find({}, function(err, students) {
    res.render('students/new', {
      title: 'Add student',
      students
    });
  });
}

function create(req, res) {
  var s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Student.create(req.body, function(err, student) {
    res.redirect('/students/new');
  });
}

function addToAttend(req, res) {
  Course.findById(req.params.id, function(err, course) {
    course.cast.push(req.body.performerId);
    course.save(function(err) {
      res.redirect(`/courses/${course.id}`);
    });
  });
}

module.exports = {
  new: newStudent,
  create,
  addToAttend
};
