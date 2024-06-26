const { Router } = require('express')
const router = Router()
const { Role } = require('../config')
const { authorize, multer } = require('../middlewares');
const { propertySchema } = require('../schemas')
const { propertyController } = require('../contollers')
const { getAll, getById,
  createNew, updateById,
  deleteById } = propertyController

router.route('/')
  .get(authorize(), getAll)
  .post(authorize([Role.Facilitator, Role.Admin]), propertySchema.updateSchema, multer, createNew)

router.route('/:id')
  .get(authorize(), getById)
  .patch(authorize([Role.Facilitator, Role.Admin]), propertySchema.updateSchema, multer, updateById)
  .delete(authorize([Role.Facilitator, Role.Admin]), deleteById)

module.exports = router