const express = require('express');
const router = express.Router();

// validation Schemas
const { authSchema } = require('../schemas')
const { authenticateSchema, registerSchema } = authSchema;

// controllers
const { userController } = require('../contollers')
const { authenticate, register } = userController;
const { userCtrl } = require('../contollers');
const { verifyEmail, verifyToken } = userCtrl;

// routes
router.post('/auth/login', authenticateSchema, authenticate)

router.post('/auth/register', registerSchema, register)

router.post('/verify/:email', verifyEmail)

router.post('/verify/:email/:token', verifyToken)


module.exports = router;