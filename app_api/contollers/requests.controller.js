const { requestService } = require('../services');
const { Role } = require('../config');
const { Response } = require('../middlewares');
const { errorResponse } = require('../middlewares/responses');
const { successResponse } = Response;

module.exports = {
  getAll,
  getByUserId,
  getById,
  saveById,
  respondById,
  deleteById,
  deleteByUserId
}

function getAll(req, res, next) {
  const { page, limit } = req.query;
  requestService.getAll(page, limit)
    .then(data => { return successResponse(res, 'All requests fetched', data) })
    .catch(next);
}

function getById(req, res, next) {
  const { id } = req.params;
  const roles = [Role.Facilitator, Role.Admin]
  
  let isAdmin = false
  if (roles.includes(req.user.role)) isAdmin = true
  requestService.getById(id, isAdmin)
    .then(data => {
      return successResponse(res, 'Request fetched successfully', data)
    })
    .catch(next);
}

function getByUserId(req, res, next) {
  const { page, limit } = req.query
  const { id } = req.params
  if (isMatch(req, id)) return errorResponse(res, 'You can not access this resource', 400)
  requestService.getByUserId(id, page, limit)
    .then(data => { return successResponse(res, 'User\'s requests fetched successfully', data) })
    .catch(next);
}

function saveById(req, res, next) {
  const { title, subject, body } = req.body;
  requestService.save({ id: req.user.id, title, subject, body })
    .then(data => { return successResponse(res, 'Request taken successfully', data, 201) })
    .catch(next);
}

function respondById(req, res, next) {
  req.body['repliedBy'] = req.user.id;
  req.body['responseTime'] = Date.now()
  const { id } = req.params;
  requestService.updateById(id, req.body)
    .then(data => { return successResponse(res, 'Response taken successfully', data) })
    .catch(next)
}

function deleteById(req, res, next) {
  requestService.deleteById(req.params.id)
    .then(() => { return successResponse(res, 'Request deleted successfully') })
    .catch(next);
}

function deleteByUserId(req, res, next) {
  requestService.deleteByUserId(req.params.id)
    .then(() => { return successResponse(res, 'User request deleted successfully') })
    .catch(next);
}

// helper functions
function isMatch(req, id) {
  const roles = [Role.Facilitator, Role.Admin];
  if (id.toString() !== req.user.id && !roles.includes(req.user.role)) {
    return true
  } else return false
}