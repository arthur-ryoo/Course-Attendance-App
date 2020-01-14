const express = require('express');
const router = express.Router();
const studentsCtrl = require('../controllers/students');

router.get('/students/new', studentsCtrl.new);
router.post('/students', studentsCtrl.create);
router.post('/courses/:id/students', studentsCtrl.addToAttend);

module.exports = router;
