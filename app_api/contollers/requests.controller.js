const { requestService } = require('../services');
const { Response, checkUser } = require('../middlewares');
const { successResponse } = Response;

module.exports = {
  getAll,
  getById,
  saveById,
  deleteById
}


function getAll(req, res, next) {
  requestService.getAll()
    .then(data => successResponse(res, 'Requests fetched', data))
    .catch(next);
}

function getById(req, res, next) {
  checkUser(req, res, req.params.id, true);
  requestService.getByUserId(req.params.id)
    .then(data => successResponse(res, 'Requests fetched', data))
    .catch(next);
}

function saveById(req, res, next) {
  const { title, subject, body } = req.body;
  requestService.save({ id: req.user.id, title, subject, body })
    .then(data => successResponse(res, 'Request taken successfully', data, 201))
    .catch(next);
}

function deleteById(req, res, next) {
  requestService.deleteById(req.params.id)
    .then(() => successResponse(res, 'Request deleted successfully'))
    .catch(next);
}