const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Define compnay related routes
router.post('/create-company', companyController.createCompany);
router.put('/update-company/:id', companyController.updateCompany);
router.delete('/delete-company/:id', companyController.deleteCompany);
router.get('/get-all-company', companyController.getAllCompany);

module.exports = router;