const router = require('express').Router();
const studentsCtrl = require('../controllers/students');

router.get('/students', isLoggedIn, studentsCtrl.index);
router.get('/students/new', isLoggedIn, studentsCtrl.new);
router.get('/students/:id', isLoggedIn, studentsCtrl.show);
router.post('/students', isLoggedIn, studentsCtrl.create);
router.post('/courses/:id/students', isLoggedIn, studentsCtrl.addToAttend);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
