const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');


module.exports = { requestSchema, responseSchema }


function requestSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function responseSchema(req, res, next) {
  const schema = Joi.object({
    response: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
