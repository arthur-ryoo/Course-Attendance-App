const router = require('express').Router();
const coursesCtrl = require('../controllers/courses');

router.get('/', isLoggedIn, coursesCtrl.index);
router.get('/new', isLoggedIn, coursesCtrl.new);
router.get('/:id', isLoggedIn, coursesCtrl.show);
router.post('/', isLoggedIn, coursesCtrl.create);
//delete
router.delete('/:id', isLoggedIn, coursesCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
