const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');

module.exports = { maketransactionSchema }

function maketransactionSchema(req, res, next) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    property: Joi.string().min(11).required()
  });
  validateRequest(req, next, schema);
}