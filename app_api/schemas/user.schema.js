const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');


module.exports = {
  updateUserSchema,
  updatePassword
}


function updateUserSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().lowercase(),
    password: Joi.string().custom(password),
  });
  validateRequest(req, next, schema);
}

function updatePassword(req, res, next) {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().custom(password).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
  });
  validateRequest(req, next, schema);
}

function password(value, helpers) {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }

  return value;
};

