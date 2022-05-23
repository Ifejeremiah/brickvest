const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');

module.exports = {
  updateUserSchema,
  updatePassword
}

function updateUserSchema(req, res, next) {
  const schema = Joi.object({
    accountNumber: Joi.number(),
    accountName: Joi.string().trim(),
    phoneNumber: Joi.number(),
    bank: Joi.string().trim(),
    state: Joi.string().trim(),
    city: Joi.string().trim(),
    image: Joi.string().trim()
  });
  validateRequest(req, next, schema);
}

function updatePassword(req, res, next) {
  const schema = Joi.object({
    currentPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().custom(password).required(),
    confirmPassword: Joi.string().trim().valid(Joi.ref('newPassword')).required()
  });
  validateRequest(req, next, schema);
}

function password(value, helpers) {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
  return value;
};

