const { requestService } = require('../services');
const { Role } = require('../config');
const { Response, checkUser } = require('../middlewares');
const { successResponse, errorResponse } = Response;

module.exports = {
  getAll,
  getByUserId,
  getById,
  saveById,
  respondById,
  deleteById
}

function getAll(req, res, next) {
  const { page, limit } = req.query;
  requestService.getAll(page, limit)
    .then(data => successResponse(res, 'Requests fetched', data))
    .catch(next);
}

function getByUserId(req, res, next) {
  const { page, limit } = req.query;
  checkUser(req, res, req.params.id, true);
  requestService.getByUserId(req.params.id, page, limit)
    .then(data => successResponse(res, 'Requests fetched', data))
    .catch(next);
}

function getById(req, res, next) {
  const { userid, id } = req.params;
  requestService.getById(id, userid)
    .then(response => {
      const role = [Role.Facilitator, Role.Admin]
      if (response.user != userid && !role.includes(req.user.role)) {
        return errorResponse(res, 'You can not access this resource')
      }
      return successResponse(res, 'Request fetched successfully', response)
    })
    .catch(next);
}

function saveById(req, res, next) {
  const { title, subject, body } = req.body;
  requestService.save({ id: req.user.id, title, subject, body })
    .then(data => successResponse(res, 'Request taken successfully', data, 201))
    .catch(next);
}

function respondById(req, res, next) {
  const { response } = req.body;
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