const express = require('express');
const router = express.Router();

const { requestsSchema } = require('../schemas')
const { responseSchema, requestSchema } = requestsSchema;
const { authorize } = require('../middlewares');
const { Role } = require('../config')
const { requestsController } = require('../contollers')
const { getAll, getByUserId, getById,
  saveById, respondById,
  deleteById, deleteByUserId } = requestsController;

router.route('/')
  .get(authorize([Role.Facilitator, Role.Admin]), getAll)
  .post(authorize(), requestSchema, saveById)

router.route('/:id')
  .get(authorize(), getById)
  .patch(authorize([Role.Facilitator, Role.Admin]), responseSchema, respondById)
  .delete(authorize(Role.Facilitator), deleteById)

router.route('/users/:id')
  .get(authorize(), getByUserId)
  .delete(authorize(Role.Facilitator), deleteByUserId)

module.exports = router;