const { db } = require('../config')

module.exports = {
  save, getAll, getNotifyByUserId
}

async function save({ userId, body }) {
  const { message, userViewed, adminViewed } = body

  const notify = await findByUserId(userId)
  if (!notify) {
    await db.Notification.create({ userId, message, userViewed, adminViewed })
  } else {
    Object.assign(notify, body)
    await notify.save()
  }
  return notify
}

async function getNotifyByUserId(id) {
  const notify = await findByUserId(id)
  return notify
}

async function findByUserId(id) {
  return await db.Notification.findOne({ userId: id })
}

async function getAll() {
  const notify = await db.Notification.find()
  return notify.map(x => format(x))
}

// helper functions
function format(body) {
  const { newPush, userViewed, adminViewed } = body
  return { newPush, userViewed, adminViewed }
}