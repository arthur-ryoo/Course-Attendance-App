const Course = require('../models/course');
const Student = require('../models/student');
module.exports = {
  index,
  show,
  new: newCourse,
  create
};

function index(req, res) {
  Course.find({}, function(err, courses) {
    res.render('courses/index', { title: 'All Courses', courses });
  });
}

function show(req, res) {
  Course.findById(req.params.id)
    .populate('attendance')
    .exec(function(err, course) {
      Student.find({ _id: { $nin: course.attend } }, function(err, student) {
        res.render('courses/show', {
          title: 'Course Detail',
          course,
          students
        });
      });
    });
}

function newCourse(req, res) {
  res.render('courses/new', { title: 'Add Course' });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const course = new Course(req.body);
  course.save(function(err) {
    if (err) return res.redirect('/courses/new');
    res.redirect(`/courses/${course._id}`);
  });
}
