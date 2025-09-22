const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validate = require('../middleware/validateCustomers');

// CRUD operations for customers
// GET all customers
router.get('/', customersController.getAll);

// GET a single customer
router.get('/:id', customersController.getSingle);

// POST create a customer
router.post('/', validate.customerRules, validate.check, customersController.createCustomer);

// PUT update a customer
router.put('/:id', validate.customerRules, validate.check, customersController.updateCustomer);

// DELETE a customer
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;
