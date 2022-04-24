const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');


module.exports = requestsSchema


function requestsSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
