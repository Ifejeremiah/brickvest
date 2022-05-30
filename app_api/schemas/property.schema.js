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
    yearBuilt: Joi.number().required(),
    size: Joi.number().required(),
    description: Joi.string().required(),
    totalUnits: Joi.number().required(),
    unitsAvailable: Joi.number().required(),
    costPerUnit: Joi.number().required(),
    ROIEstimate: Joi.number().required()
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string(),
    image: Joi.string(),
    location: Joi.string(),
    yearBuilt: Joi.number(),
    size: Joi.number(),
    description: Joi.string(),
    totalUnits: Joi.number(),
    unitsAvailable: Joi.number(),
    costPerUnit: Joi.number(),
    ROIEstimate: Joi.number(),
    isPrivate: Joi.boolean(),
    status: Joi.string()
  });
  validateRequest(req, next, schema);
}
