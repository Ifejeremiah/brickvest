const express = require('express');
const router = express.Router();

const { requestsSchema } = require('../schemas')
const { authorize } = require('../middlewares');
const { Role } = require('../config')
const { requestsController } = require('../contollers')
const { getAll,
  getByUserId, getById,
  saveById, deleteById } = requestsController;

router.route('/')
  .get(authorize([Role.Facilitator, Role.Admin]), getAll)
  .post(authorize(), requestsSchema, saveById)

router.route('/:id')
  .get(authorize(), getByUserId)
  .delete(authorize(Role.Facilitator), deleteById)

router.get('/:userid/:id', authorize(), getById)

module.exports = router;