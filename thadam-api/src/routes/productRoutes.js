const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product-related routes
router.post('/create-product', productController.createProduct);
router.put('/update-product/:id', productController.updateProduct);
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-product-categories', productController.getProductCategories);

module.exports = router;