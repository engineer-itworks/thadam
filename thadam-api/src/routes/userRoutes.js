const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define compnay related routes
router.post('/create-user', userController.createUser);
// router.put('/update-user/:id', userController.updateUser);
// router.delete('/delete-user/:id', userController.deleteUser);
// router.get('/get-all-user', userController.getAllUser);

module.exports = router;