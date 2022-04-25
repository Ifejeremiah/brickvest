const { db, build } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  save
}

async function getAll(page) {
  const query = db.Action.aggregate();
  const customLabels = { totalDocs: 'totalResults', limit: 'perPage', page: 'currentPage' };
  const options = { page: page ? page : 1, limit: 10, customLabels }
  const actions = await db.Action.aggregatePaginate(query, options);
  return build(actions, basicDetails);
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

function basicDetails(request) {
  let { _id, user, body } = request;
  return { id: _id, user, body };
}