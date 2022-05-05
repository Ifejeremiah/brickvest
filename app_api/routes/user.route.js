const express = require('express');
const router = express.Router();

const { userController, activityController } = require('../contollers');
const {
  getAll,
  getById,
  updateById,
  updateRole,
  updatePassword,
  deleteById
} = userController;
const { Role } = require('../config')
const { authorize } = require('../middlewares');
const { userSchema } = require('../schemas');


router.get('/', authorize([Role.Facilitator]), getAll);

router.get('/actions', authorize(Role.Facilitator), activityController.getAll);

router.get('/actions/:id', authorize(), activityController.getById);

router.route('/:id')
  .get(authorize(), getById)
  .patch(authorize(), userSchema.updateUserSchema, updateById)
  .delete(authorize(), deleteById);

router.patch('/:id/roles', authorize([Role.Facilitator]), updateRole);

router.patch('/:id/passwords', authorize(), userSchema.updatePassword, updatePassword)

module.exports = router;
