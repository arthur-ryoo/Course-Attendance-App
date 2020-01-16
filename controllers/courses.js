const Course = require('../models/course');
const Student = require('../models/student');
module.exports = {
  index,
  show,
  new: newCourse,
  create,
  delete: newDelete
};

function newDelete(req, res) {
  Course.deleteOne({ _id: req.params.id }, function(err) {
    if (err) console.log(err);
    console.log('Delete successful');
  });
  res.redirect('/courses/');
}

function index(req, res) {
  Course.find({}, function(err, courses) {
    console.log(courses);
    res.render('courses/index', {
      title: 'All Courses',
      courses,
      user: req.user
    });
  });
}

function show(req, res) {
  Course.findById(req.params.id)
    .populate('attendance')
    .exec(function(err, course) {
      Student.find({ _id: { $nin: course.attend } }, function(err, students) {
        res.render('courses/show', {
          title: 'Course Detail',
          courses,
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
    if (err) {
      console.log(err);
      return res.redirect('/courses/new');
    }
    res.redirect(`/courses/${course._id}`);
  });
}
