const { requestService } = require('../services');
const { Role } = require('../config');
const { Response, checkUser } = require('../middlewares');
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
    .then(data => successResponse(res, 'All requests fetched', data))
    .catch(next);
}

function getById(req, res, next) {
  const { id } = req.params;
  requestService.getById(id)
    .then(data => {
      checkUser(req, res, data.user, true)
      successResponse(res, 'Request fetched successfully', data)
    })
    .catch(next);
}

function getByUserId(req, res, next) {
  const { page, limit } = req.query
  const { id } = req.params
  checkUser(req, res, id, true)
  requestService.getByUserId(id, page, limit)
    .then(data => successResponse(res, 'User\'s requests fetched successfully', data))
    .catch(next);
}

function saveById(req, res, next) {
  const { title, subject, body } = req.body;
  requestService.save({ id: req.user.id, title, subject, body })
    .then(data => successResponse(res, 'Request taken successfully', data, 201))
    .catch(next);
}

function respondById(req, res, next) {
  req.body['repliedBy'] = req.user.id;
  req.body['responseTime'] = Date.now()
  const { id } = req.params;
  requestService.updateById(id, req.body)
    .then(data => successResponse(res, 'Response taken successfully', data))
    .catch(next)
}

function deleteById(req, res, next) {
  requestService.deleteById(req.params.id)
    .then(() => successResponse(res, 'Request deleted successfully'))
    .catch(next);
}

function deleteByUserId(req, res, next) {
  requestService.deleteByUserId(req.params.id)
    .then(() => successResponse(res, 'Request deleted successfully'))
    .catch(next);
}