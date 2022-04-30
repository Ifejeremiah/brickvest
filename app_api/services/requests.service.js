const { db, build, paginate } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  getById,
  save,
  deleteById
}

async function getAll(page, limit) {
  const requests = await paginate(
    db.Request, true,
    {}, page, limit
  )
  return build(requests, format);
}

async function getByUserId(id, page, limit) {
  await getRequest(id);
  const requests = await paginate(
    db.Request, true,
    { user: db.ObjectId(id) },
    page, limit
  )
  return build(requests, format);
}

async function getById(id, userid) {
  await getRequest(userid);
  if (!db.isValidId(id)) throw 'Invalid ID';
  const request = await db.Request.findById(id);
  if (!request) throw 'Request not found'
  return request;
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
  if (!db.isValidId(id)) throw 'Invalid ID';
  const request = await db.Request.findOne({ user: id });
  if (!request) throw 'User not found';
  return request;
}

function format(request) {
  let { _id, user, title, subject, body, createdAt } = request;
  return { id: _id, user, title, subject, body, createdAt };
}