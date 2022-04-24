const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');


module.exports = {
  authenticateSchema,
  registerSchema
}


function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}


function registerSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().custom(password),
    password2: Joi.string().valid(Joi.ref('password')).required()
  });
  validateRequest(req, next, schema);
}


function password(value, helpers) {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }

  return value;
};

