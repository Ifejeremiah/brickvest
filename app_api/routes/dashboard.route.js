const express = require('express');
const router = express.Router();

const { dashboardCtrl } = require('../contollers')

// Auth Guard


// @desc  Dashboard handle
// @route   GET /dashboard
router.get('/dashboard', dashboardCtrl.allProperties)



module.exports = router;
