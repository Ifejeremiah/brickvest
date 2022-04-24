const { db } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  save,
  deleteById
}

async function getAll() {
  return await db.Request.find();
}

async function getByUserId(id) {
  await getRequest(id);
  return await db.Request.find({ user: id }).populate('user')
}

async function save({ id, title, subject, body }) {
  return await db.Request.create({ user: id, title, subject, body });
}

async function deleteById(id) {
  const request = await getRequest(id);
  await db.Request.deleteMany({ user: id });
  return request;
}

// helper functions

async function getRequest(id) {
  if (!db.isValidId(id)) throw 'User not found';
  const request = await db.Request.findOne({ user: id });
  if (!request) throw 'No requests yet';
  return request;
}