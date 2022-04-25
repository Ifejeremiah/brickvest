const { activityService } = require('../services')
const { Response, checkUser } = require('../middlewares')
const { successResponse } = Response;


module.exports = {
  getAll, getById
}

function getAll(req, res, next) {
  activityService.getAll(req.query.page)
    .then(data => successResponse(res, 'User actions fetched', data))
    .catch(next);
}

function getById(req, res, next) {
  checkUser(req, res, req.params.id);
  activityService.getByUserId(req.params.id)
    .then(data => successResponse(res, 'User action fetched', data))
    .catch(next);
}
