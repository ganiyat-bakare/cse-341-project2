const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all customers
const getAll = async (req, res) => {
  // #swagger.tags = ['Customers']
  try {
    const result = await mongodb.getDatabase().db().collection('customers').find();
    const customers = await result.toArray();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single customer
const getSingle = async (req, res) => {
  // #swagger.tags = ['Customers']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID.' });
    }
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('customers')
      .find({ _id: customerId });
    const customers = await result.toArray();
    res.status(200).json(customers[0]);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a customer
const createCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  try {
    console.log('Request body:', req.body);
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      favoriteProduct: req.body.favoriteProduct,
      city: req.body.city,
      country: req.body.country
    };

    const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
      res.status(201).json({ success: true, id: response.insertedId });
    } else {
      res.status(500).json({ success: false, message: 'Error creating customer.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  try {
    console.log('Request body:', req.body);
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID.' });
    }
    const customerId = new ObjectId(req.params.id);
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      favoriteProduct: req.body.favoriteProduct,
      city: req.body.city,
      country: req.body.country
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('customers')
      .replaceOne({ _id: customerId }, customer);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ success: false, message: 'Error updating customer.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID.' });
    }
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('customers')
      .deleteOne({ _id: customerId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ success: false, message: 'Error deleting customer.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
