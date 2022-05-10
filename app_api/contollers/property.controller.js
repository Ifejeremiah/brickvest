const { Response, checkUser } = require('../middlewares')
const { successResponse } = Response;
const { propertyService } = require('../services')

module.exports = {
  getAll, getById,
  createNew, updateById,
  deleteById
}

function getAll(req, res, next) {
  const { limit, page } = req.query
  propertyService.getAll(page, limit)
    .then(data => successResponse(res, 'Properties fetched successfully', data))
    .catch(next)
}

function getById(req, res, next) {
  const { id } = req.params
  propertyService.getById(id)
    .then(data => successResponse(res, 'Property fetched successfully', data))
    .catch(next)
}

function createNew(req, res, next) {
  req.body['createdBy'] = req.user.id
  propertyService.create(req.body)
    .then(data => successResponse(res, 'Create successfully', data, 201))
    .catch(next)
}

function updateById(req, res, next) {
  const { id } = req.params
  req.body['updatededBy'] = req.user.id
  propertyService.updateById(id, req.body)
    .then(data => successResponse(res, 'Property updated successfully', data))
    .catch(next)
}

function deleteById(req, res, next) {
  const { id } = req.params
  propertyService.deleteById(id)
    .then(data => successResponse(res, 'Property deleted successfully', data))
    .catch(next)
}

