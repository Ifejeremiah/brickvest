const { Router } = require('express')
const router = Router()
const { authorize } = require('../middlewares');
const { Role } = require('../config')
const { notifyController } = require('../contollers')
const { getAll, getByUserId } = notifyController

router.get('/', authorize([Role.Facilitator, Role.Admin]), getAll)

router.route('/users/')
  .get(authorize(), getByUserId)

module.exports = router
