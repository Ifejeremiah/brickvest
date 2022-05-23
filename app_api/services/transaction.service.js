const Flutterwave = require('flutterwave-node-v3');
const crypto = require('crypto')
const { db, paginate, build, } = require('../config')
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  verify,
}

async function paginateTransactions(Model, mostRecentFirst, match = {}, page = 1, limit = 10, sortBy = '') {
  const query = Model.aggregate([
    { $match: match },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "properties",
        localField: "property",
        foreignField: "_id",
        as: "property"
      }
    },
    { $unwind: "$property" },
    {
      $project: {
        "user.__v": 0,
        "property.__v": 0,
        "user.passwordHash": 0,
        "user.isVerified": 0,
        "user.updatedAt": 0,
        "property.updatedAt": 0,
      }
    }
  ])

  const customLabels = {
    totalDocs: 'totalResults',
    limit: 'perPage',
    page: 'currentPage',
  };

  const options = {
    page,
    limit,
    sort: mostRecentFirst ? '-createdAt' : sortBy,
    customLabels
  }

  return await Model.aggregatePaginate(query, options)
}

async function getAll(page, limit, status) {
  const transaction = await paginateTransactions(
    db.Transaction, true,
    status ? status : {}, page, limit
  )
  return build(transaction, format)
}

async function getById(id) {
  const transaction = await getTransaction(id)
  return format(transaction)
}

async function getByUserId(id, page, limit) {
  await getUser(id)
  const transaction = await paginateTransactions(
    db.Transaction, true,
    { user: db.ObjectId(id) },
    page, limit
  )
  return build(transaction, format);
}

async function create({ user, amount, property }) {
  await getUser(user)
  await verifyProperty(property)
  const transactionRef = crypto.randomBytes(8).toString('hex')
  return await db.Transaction.create({ user, amount, transactionRef, property })
}

async function verify({ transRef, transId }) {
  const transaction = await getTransactionByRef(transRef)
  const response = await flw.Transaction.verify({ id: transId })

  if (!response.data) throw response.message
  else {
    if (
      response.data.status === "successful"
      && response.data.tx_ref === transaction.transactionRef
      && response.data.amount >= transaction.amount
    ) {
      return await assignSuccess()
    } else {
      return await assignFailed()
    }
  }

  async function assignSuccess() {
    transaction.status = 'success'
    await transaction.save()
    return { msg: 'Transaction verification successfull', transaction }
  }

  async function assignFailed() {
    transaction.status = 'failed'
    await transaction.save()
    return { msg: 'Transaction verification failed', transaction }
  }
}

// helper functions
async function getTransaction(id) {
  if (!db.isValidId(id)) throw 'Invalid Transaction ID'
  const transaction = await db.Transaction.findById(id).populate(['user', 'property'])
  if (!transaction) throw 'Transaction not found'
  return transaction
}

async function getTransactionByRef(transactionRef) {
  const transaction = await db.Transaction.findOne({ transactionRef })
  if (!transaction) throw 'Transaction reference not found'
  return transaction
}

async function getUser(id) {
  if (!db.isValidId(id)) throw 'Invalid User ID';
  const user = await db.User.findById(id);
  if (!user) throw 'User not found';
  return user
}

async function verifyProperty(id) {
  if (!db.isValidId(id)) throw 'Invalid Property ID';
  const property = await db.Property.findById(id)
  if (!property) throw 'Property not found'
  return property
}

function format(result) {
  let { _id, user, status, amount, transactionRef, property, createdAt } = result;
  return { id: _id, user, status, amount, transactionRef, property, createdAt };
}