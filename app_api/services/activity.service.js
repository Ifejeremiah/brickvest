const { db } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  save
}

async function getAll() {
  return await db.Action.find();
}

async function getByUserId(id) {
  await getAction(id);
  return await db.Action.find({ user: id }).populate('user');
}

async function save({ id, body }) {
  return await db.Action.create({ user: id, body });
}

// helper functions

async function getAction(id) {
  if (!db.isValidId(id)) throw 'User not found';
  const action = await db.Action.findOne({ user: id });
  if (!action) throw 'No activities yet';
  return action;
}