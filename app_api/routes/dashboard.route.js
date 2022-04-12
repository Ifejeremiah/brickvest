const express = require('express');
const router = express.Router();

const { dashboardCtrl } = require('../contollers')

// Auth Guard
const auth = require('../config/auth');



// @desc  Dashboard handle
// @route   GET /dashboard
router.get('/dashboard', auth, dashboardCtrl.allProperties)



module.exports = router;
