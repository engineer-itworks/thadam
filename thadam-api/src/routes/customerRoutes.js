const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create-customer', customerController.createCustomer);
router.put('/update-customer/:id', customerController.updateCustomer);
router.delete('/delete-customer/:id', customerController.deleteCustomer);
router.get('/get-all-customers', customerController.getAllCustomers);

module.exports = router;