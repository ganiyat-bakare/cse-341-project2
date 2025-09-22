const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validate = require('../middleware/validateStudents');

// GET all students
router.get('/', studentsController.getAll);

// GET a single student
router.get('/:id', studentsController.getSingle);

// POST create a student
router.post('/', validate.studentRules, validate.check, studentsController.createStudent);

// PUT update a student
router.put('/:id', validate.studentRules, validate.check, studentsController.updateStudent);

// DELETE a student
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
