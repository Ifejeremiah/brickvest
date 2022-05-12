const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');

module.exports = {
  maketransactionSchema,
  verifyTransactionSchema
}

function maketransactionSchema(req, res, next) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    property: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function verifyTransactionSchema(req, res, next) {
  const schema = Joi.object({
    transactionRef: Joi.string().required(),
    flwTransactionId: Joi.string().required()
  });
  validateRequest(req, next, schema);
}