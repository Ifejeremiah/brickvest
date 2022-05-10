const { Router } = require('express')
const router = Router()

const { transactionController } = require('../contollers')
const { getAll, getById,
  getByUserId, makeTransaction,
  updateStatus } = transactionController
const { transactionSchema } = require('../schemas')
const { Role } = require('../config')
const { authorize } = require('../middlewares');


router.route('/')
  .get(authorize([Role.Facilitator, Role.Admin]), getAll)
  .post(authorize(), transactionSchema.maketransactionSchema, makeTransaction)

router.route('/:id')
  .get(authorize([Role.Facilitator, Role.Admin]), getById)
  .patch(authorize(), updateStatus)

router.route('/users/:id')
  .get(authorize(), getByUserId)

module.exports = router