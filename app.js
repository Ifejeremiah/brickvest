const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const cors = require('cors');

require('dotenv').config();


require('./app_api/models');
require('./app_api/config/passport');
const apiRouter = require('./app_api/routes');



// Initialize express
const app = express();


// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Angular front-end build
app.use(express.static(path.join(__dirname, 'app_public', 'build')));


// Catch all routes
// app.use('/*', express.static(path.join(__dirname, 'app_public', 'build', 'index.html')))


// Initialize passport
app.use(passport.initialize());


// @desc Allow CORS requests for development purposes only
// @route GET /api
const allowedOrigins = ['http://localhost:4200', `http://localhost:${app.get('port')}`]
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionSuccessStatus: 200
}


// @desc Allowing CORS requests for development purposes only
// @route * /
app.use(cors(corsOptions));


// @desc Handle routes to API 
// @route GET /api
app.use('/api', apiRouter);


// @desc Handle Unauthorized actions
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.message}` })
  } next();
});


// @desc Handle 'not found' requests
// @route GET /*
app.use(function (req, res) {
  return res.status(404).json({ error: 'resource not found' });
});


// Handle server errors
app.use(function (err, req, res, next) {
  app.get('env') !== 'production' ? console.log(err) : null;
  return res.status(500).json({ error: 'internal error on server' });
});


module.exports = app;
