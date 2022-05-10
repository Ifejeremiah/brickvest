const { db, paginate, build, } = require('../config')
const crypto = require('crypto')

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateStatus,
}


async function getAll(page, limit) {
  const transaction = await paginate(
    db.Transaction, true,
    {}, page, limit
  )
  return build(transaction, format)
}

async function getById(id) {
  const transaction = await getTransaction(id)
  return format(transaction)
}

async function getByUserId(id, page, limit) {
  await getUser(id)
  const transaction = await paginate(
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

async function updateStatus(id) {
  const transaction = await getTransaction(id)
  const amount = transaction.amount
  const currency = 'NGN'
  // verifyTransaction(id, amount, currency)
  await transaction.save()
  return format(transaction)
}

// helper functions
async function getTransaction(id) {
  if (!db.isValidId(id)) throw 'Invalid Transaction ID'
  const transaction = await db.Transaction.findById(id)
  if (!transaction) throw 'Transaction not found'
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

// ERRORS STARTED FROM HERE
// async function verifyTransaction(id, expectedAmount, expectedCurrency) {
//   flw_verify(id, expectedAmount, expectedCurrency, () => { console.log('Done'), () => { console.log('error') } })
// }

function format(result) {
  let { _id, user, status, amount, transactionRef, property, createdAt } = result;
  return { id: _id, user, status, amount, transactionRef, property, createdAt };
}
