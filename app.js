const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./app_api/routes');

const app = express();


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Angular front-end build
app.use(express.static(path.join(__dirname, 'app_public', 'build')));


// @desc API version 1
app.use('/api/v1', apiRouter);

// Handle 'not found' requests
app.use(function (req, res, next) {
  res.status(404).json({ error: 'resource not found' });
});

// Handle server errors
app.use(function (err, req, res, next) {
  req.app.get('env') !== 'production' ? console.log(err) : false
  res.status(500).json({ error: 'internal error on server' });
});


module.exports = app;
