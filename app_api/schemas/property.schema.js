const Joi = require('@hapi/joi');
const { validateRequest } = require('../middlewares');

module.exports = {
  createSchema,
  updateSchema
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    yearBuilt: Joi.string().required(),
    size: Joi.string().required(),
    description: Joi.string().required(),
    totalUnits: Joi.string().required(),
    unitsAvailable: Joi.string().required(),
    costPerUnit: Joi.string().required(),
    ROIEstimate: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string(),
    image: Joi.string(),
    location: Joi.string(),
    yearBuilt: Joi.string(),
    size: Joi.string(),
    description: Joi.string(),
    totalUnits: Joi.string(),
    unitsAvailable: Joi.string(),
    costPerUnit: Joi.string(),
    ROIEstimate: Joi.string(),
    status: Joi.string()
  });
  validateRequest(req, next, schema);
}
