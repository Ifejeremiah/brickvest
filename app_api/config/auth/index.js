//Route guard middleware

module.exports = require('express-jwt')({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'payload'
});