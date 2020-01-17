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
  Course.find({}, function(err, allCourses) {
    let courses = allCourses.filter(c => c.user == req.user.id);
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
      console.log(course);
      Student.find({ _id: { $nin: course.attend } }, function(err, students) {
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
  let course = new Course();
  course.title = req.body.title;
  course.location = req.body.location;
  course.credit = req.body.credit;
  course.description = req.body.description;
  course.user = req.user;
  // const course = new Course(req.body);
  course.save(function(err) {
    if (err) {
      console.log(err);
      return res.redirect('/courses/new');
    }
    res.redirect(`/courses/${course._id}`);
  });
}
