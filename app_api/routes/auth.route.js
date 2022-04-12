const express = require('express');
const router = express.Router();

const { userCtrl } = require('../contollers');


// @desc login
// @route POST /login
router.post('/login', userCtrl.login)


// @desc register 
// @route POST /register
router.post('/register', userCtrl.register)


// @desc forgot password
// @route GET /forgot_password/:email
router.get('/recover-account/:email', userCtrl.recoverEmail)


// @desc send code from email 
// @route POST /forgot_password/:token
router.post('/recover-account/:email/:token', userCtrl.recoverToken)




module.exports = router;