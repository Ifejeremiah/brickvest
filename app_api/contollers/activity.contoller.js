const { activityService } = require('../services')
const { Response, checkUser } = require('../middlewares')
const { successResponse } = Response;


module.exports = {
  getAll, getById
}

function getAll(req, res, next) {
  const { page, limit } = req.query;
  activityService.getAll(page, limit)
    .then(data => successResponse(res, 'User actions fetched', data))
    .catch(next);
}

function getById(req, res, next) {
  const { page, limit } = req.query;
  const { id } = req.params;
  checkUser(req, res, id);
  
  activityService.getByUserId(id, page, limit)
    .then(data => successResponse(res, 'User action fetched', data))
    .catch(next);
}
