const express = require('express');
const router = express.Router();

const { userCtrl } = require('../contollers');
const { login, register, verifyEmail, verifyToken } = userCtrl



// @desc login
// @route POST /login
router.post('/auth/login', login)


// @desc register 
// @route POST /register
router.post('/auth/register', register)


// @desc forgot password
// @route GET /forgot_password/:email
router.get('/verify-account/:email', verifyEmail)


// @desc send code from email 
// @route POST /forgot_password/:token
router.post('/verify-account/:email/:token', verifyToken)


module.exports = router;