require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { errorHandler } = require('./app_api/middlewares')
const { cross, frontEnd } = require('./app_api/config')


// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Front-end build
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

// Allow cors
app.use(cors(cross.option));

// API routes
app.use('/api', require('./app_api/routes'));

// Frontend routes
app.get(/(\/login)|(\/register)|(\/overview)|(\/explore)|(\/co-own)|(\/requests)|(\/profile)|(\/verify-account)|(\/recover-account)|(\/update-password)|(\/delete-account)|(\/location\/[a-z0-9]{24})/,
  (req, res) => {
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
  });

// Handle errors
app.use(errorHandler.notFoundError);

app.use(errorHandler.errorHandler);

module.exports = app;
