const express = require('express');
const router = express.Router();

const { requestsSchema } = require('../schemas')
const { authorize } = require('../middlewares');
const { Role } = require('../config')
const { requestsController } = require('../contollers')
const { getAll,
  getById, saveById,
  deleteById } = requestsController;

router.get('/', authorize([Role.Facilitator, Role.Admin]), getAll)

router.post('/', authorize(), requestsSchema, saveById)

router.get('/:id', authorize(), getById)

router.delete('/:id', authorize(Role.Facilitator), deleteById)

module.exports = router;