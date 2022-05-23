const { userService, activityService } = require('../services');
const { Response, checkUser } = require('../middlewares')
const { successResponse, errorResponse } = Response;


module.exports = {
  authenticate,
  register,
  getAll,
  getById,
  updateById,
  updateRole,
  updatePassword,
  deleteById
}

function authenticate(req, res, next) {
  const { email, password } = req.body;

  userService.authenticate({ email, password })
    .then(({ ...user }) => {
      return successResponse(res, 'User authenicated successfully', user);
    })
    .catch(next);
}

function register(req, res, next) {
  const { name, email, password } = req.body;
  userService.register({ name, email, password })
    .then((response) => {
      return successResponse(res, 'User registered successfully', response, 201);
    })
    .catch(next);
}

function getAll(req, res, next) {
  const { page, limit, role } = req.query
  userService.getAll(page, limit, role ? { role } : '')
    .then(users => {
      return successResponse(res, 'Users gotten successfully', users)
    })
    .catch(next);
}

function getById(req, res, next) {
  checkUser(req, res, req.params.id);
  userService.getById(req.params.id)
    .then(user => user ? successResponse(res, 'User gotten successfully', user) : errorResponse(res, 'Not found', 404))
    .catch(next);
}

function updateById(req, res, next) {
  const { id } = req.params;
  checkUser(req, res, id);
  userService.updateById(id, req.body)
    .then((response) => {
      activityService.save({ id, body: `Account updated` })
      return successResponse(res, 'User updated successfully', response, 200);
    })
    .catch(next);
}

function updateRole(req, res, next) {
  const { id } = req.params
  userService.updateById(id, req.body)
    .then(async (response) => {
      await activityService.save({ id, body: `Role updated to ${req.body.role}` })
      return successResponse(res, 'User role updated successfully', response, 200);
    })
    .catch(next);
}

function updatePassword(req, res, next) {
  const { id } = req.params
  const { currentPassword, newPassword } = req.body
  checkUser(req, res, id);
  userService.updatePassword(id, currentPassword, newPassword)
    .then(async (response) => {
      await activityService.save({ id, body: 'Password changed' })
      return successResponse(res, 'Password updated successfully', response, 200);
    })
    .catch(next)
}

function deleteById(req, res, next) {
  checkUser(req, res, req.params.id);
  userService.deleteById(req.params.id)
    .then((response) => {
      return successResponse(res, 'User deleted successfully', response, 200);
    })
    .catch(next);
}