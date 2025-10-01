const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validate = require('../middleware/validateStudents');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all students
router.get('/', studentsController.getAll);

// GET a single student
router.get('/:id', studentsController.getSingle);

// POST create a student
// #swagger.security = [{ "oauth": [] }]
router.post(
  '/',
  isAuthenticated,
  validate.studentRules,
  validate.check,
  studentsController.createStudent
);

// PUT update a student
// #swagger.security = [{ "oauth": [] }]
router.put(
  '/:id',
  isAuthenticated,
  validate.studentRules,
  validate.check,
  studentsController.updateStudent
);

// DELETE a student
// #swagger.security = [{ "oauth": [] }]
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;
