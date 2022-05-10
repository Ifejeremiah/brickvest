const { db, build, paginate } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  save
}

async function getAll(page, limit) {
  const actions = await paginate(
    db.Action,
    true, {},
    page, limit);

  return build(actions, format);
}

async function getByUserId(id, page, limit) {
  await verifyUser(id);
  const actions = await paginate(
    db.Action, true,
    { user: db.ObjectId(id) },
    page, limit)
    
  return build(actions, format);
}

async function save({ id, body }) {
  return await db.Action.create({ user: id, body });
}

// helper functions
async function verifyUser(id) {
  if (!db.isValidId(id)) throw 'Invalid User ID';
  const action = await db.Action.find({ user: id });
  if (!action) throw 'User not found';
  return action;
}

function format(request) {
  let { _id, user, body, createdAt } = request;
  return { id: _id, user, body, createdAt };
}