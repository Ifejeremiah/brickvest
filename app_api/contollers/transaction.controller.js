const { transactionService } = require('../services');
const { Role } = require('../config');
const { Response, checkUser } = require('../middlewares');
const { successResponse } = Response;

module.exports = {
  getAll,
  getById,
  getByUserId,
  makeTransaction,
  verifyTransaction
}

function getAll(req, res, next) {
  const { page, limit } = req.query
  transactionService.getAll(page, limit)
    .then(data => { return successResponse(res, 'Transactions fetched', data) })
    .catch(next)
}

function getById(req, res, next) {
  const { id } = req.params;
  transactionService.getById(id)
    .then(data => {
      checkUser(req, res, data.user, true)
      return successResponse(res, 'Transaction fetched', data)
    })
    .catch(next)
}

function getByUserId(req, res, next) {
  const { id } = req.params
  const { page, limit } = req.query
  checkUser(req, res, id, true)
  transactionService.getByUserId(id, page, limit)
    .then(data => { return successResponse(res, 'User Transactions fetched', data) })
    .catch(next)
}

function makeTransaction(req, res, next) {
  const { amount, propertyid } = req.body
  transactionService.create({ user: req.user.id, property: propertyid, amount })
    .then(data => { return successResponse(res, 'Transaction created', data, 201) })
    .catch(next)
}

function verifyTransaction(req, res, next) {
  const { transReference, flwTransId } = req.body
  transactionService.verify({ transRef: transReference, transId: flwTransId })
    .then(data => {
      return successResponse(res, data.msg, data.transaction)
    })
    .catch(next)
}