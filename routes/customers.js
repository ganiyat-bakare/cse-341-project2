const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validate = require('../middleware/validateCustomers');
const { isAuthenticated } = require('../middleware/authenticate');

// CRUD operations for customers
// GET all customers
router.get('/', customersController.getAll);

// GET a single customer
router.get('/:id', customersController.getSingle);

// POST create a customer
// #swagger.security = [{ "oauth": [] }]
router.post(
  '/',
  isAuthenticated,
  validate.customerRules,
  validate.check,
  customersController.createCustomer
);

// PUT update a customer
// #swagger.security = [{ "oauth": [] }]
router.put(
  '/:id',
  isAuthenticated,
  validate.customerRules,
  validate.check,
  customersController.updateCustomer
);

// DELETE a customer
// #swagger.security = [{ "oauth": [] }]
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;
