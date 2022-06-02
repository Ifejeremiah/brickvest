const { notifyService } = require('../services')
const { Response } = require('../middlewares');
const { successResponse } = Response

module.exports = { getByUserId, getAll }

function getAll(req, res, next) {
  notifyService.getAll()
    .then(data => successResponse(res, 'Notifications fetched successfully', data))
    .catch(next)
}

function getByUserId(req, res, next) {
  notifyService.getNotifyByUserId(req.user.id)
    .then(data => successResponse(res, 'Notification fetched successfully', data))
    .catch(next)
}