const Joi = require('joi')

const password = require('./password.js')


const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password),
  password2: Joi.string().valid(Joi.ref('password')).required()
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})


module.exports = { registerSchema, loginSchema }