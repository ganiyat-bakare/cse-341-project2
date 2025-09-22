const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all students
const getAll = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    const result = await mongodb.getDatabase().db().collection('students').find();
    const students = await result.toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single student
const getSingle = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });
    }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
    const students = await result.toArray();
    res.status(200).json(students[0]);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a student
const createStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    console.log('Request body:', req.body);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      course: req.body.course,
      city: req.body.city,
      country: req.body.country
    };

    const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
    if (response.acknowledged) {
      res.status(201).json({ success: true, id: response.insertedId });
    } else {
      res.status(500).json({ success: false, message: 'Error creating student.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    console.log('Request body:', req.body);
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });
    }
    const studentId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      course: req.body.course,
      city: req.body.city,
      country: req.body.country
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .replaceOne({ _id: studentId }, student);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ success: false, message: 'Error updating student.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });
    }
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ success: false, message: 'Error deleting student.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};
