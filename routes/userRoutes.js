const express = require('express');
const { registerUserController, userLoginController, fetchUserDetailsController } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
//rote for register
router.post('/register', registerUserController)

//route for login
router.post('/log-in', userLoginController)

//route for getting user details
router.get('/:id',authMiddleware,fetchUserDetailsController)

module.exports = router