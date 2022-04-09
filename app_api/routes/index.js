const express = require('express');
const router = express.Router();

const { getUsers } = require('../contollers');


// Route to get all users
router.get('/', getUsers);



module.exports = router;
