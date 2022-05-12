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
    .then(data => successResponse(res, 'Transactions fetched', data))
    .catch(next)
}

function getById(req, res, next) {
  const { id } = req.params;
  transactionService.getById(id)
    .then(data => {
      checkUser(req, res, data.user, true)
      successResponse(res, 'Transaction fetched', data)
    })
    .catch(next)
}

function getByUserId(req, res, next) {
  const { id } = req.params
  const { page, limit } = req.query
  checkUser(req, res, id, true)
  transactionService.getByUserId(id, page, limit)
    .then(data => successResponse(res, 'User Transactions fetched', data))
    .catch(next)
}

function makeTransaction(req, res, next) {
  const { amount, property } = req.body
  transactionService.create({ user: req.user.id, property, amount })
    .then(data => successResponse(res, 'Transaction created', data, 201))
    .catch(next)
}

function verifyTransaction(req, res, next) {
  const { transactionRef, flwTransactionId } = req.body
  transactionService.updateStatus({ transactionRef, flwTransactionId })
    .then(data => successResponse(res, 'I will get the response soon', data))
    .catch(next)
}