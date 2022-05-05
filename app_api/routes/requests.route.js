const express = require('express');
const router = express.Router();

const { requestsSchema } = require('../schemas')
const { responseSchema, requestSchema } = requestsSchema;
const { authorize } = require('../middlewares');
const { Role } = require('../config')
const { requestsController } = require('../contollers')
const { getAll, getByUserId, getById,
  saveById, respondById, deleteById } = requestsController;

router.route('/')
  .get(authorize([Role.Facilitator, Role.Admin]), getAll)
  .post(authorize(), requestSchema, saveById)

router.route('/:id')
  .get(authorize(), getByUserId)
  .patch(authorize([Role.Facilitator, Role.Admin]), responseSchema, respondById)
  .delete(authorize(Role.Facilitator), deleteById)

router.get('/:userid/:id', authorize(), getById)

module.exports = router;