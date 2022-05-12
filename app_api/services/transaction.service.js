const Flutterwave = require('flutterwave-node-v3');
const crypto = require('crypto')
// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const { db, paginate, build, } = require('../config')

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

async function updateStatus({ transactionRef, flwTransactionId }) {
  const transaction = await getTransactionRef(transactionRef)

  // flw.Transaction.verify({ id: flwTransactionId })
  //   .then((response) => {
  //     if (
  //       response.data.status === "successful"
  //       && response.data.amount >= expectedAmount
  //       && response.data.tx_ref === transactionRef) {
  //       async () => { await updateSuccess() }
  //     } else {
  //       async () => { await updateFailed() }
  //       throw 'Flutterwave transaction failed'
  //     }
  //   })
  //   .catch(console.log);

  // async function updateSuccess() {
  //   transaction.status = 'success'
  //   await transaction.save()
  // }

  // async function updateFailed() {
  //   transaction.status = 'failed'
  //   await transaction.save()
  // }

  return format(transaction)
}

// helper functions
async function getTransaction(id) {
  if (!db.isValidId(id)) throw 'Invalid Transaction ID'
  const transaction = await db.Transaction.findById(id)
  if (!transaction) throw 'Transaction not found'
  return transaction
}

async function getTransactionRef(tx_ref) {
  const transaction = await db.Transaction.findOne(tx_ref)
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
