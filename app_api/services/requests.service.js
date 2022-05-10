const { db, build, paginate } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  getById,
  save,
  updateById,
  deleteById
}

async function getAll(page, limit) {
  const requests = await paginate(
    db.Request, true,
    {}, page, limit
  )
  return build(requests, getAllFormat);
}

async function getByUserId(id, page, limit) {
  await getRequest(id);
  const requests = await paginate(
    db.Request, true,
    { user: db.ObjectId(id) },
    page, limit
  )
  return build(requests, getByUserIDFormat);
}

async function getById(id, userid) {
  await getRequest(userid);
  if (!db.isValidId(id)) throw 'Invalid ID'
  const request = await db.Request.findById(id)
  if (!request) throw 'Request not found'
  const seen = { hasViewed: true }
  Object.assign(request, seen)
  await request.save()
  return request;
}

async function save({ id, title, subject, body }) {
  return await db.Request.create({ user: id, title, subject, body });
}

async function updateById(id, response) {
  if (!db.isValidId(id)) throw 'Invalid ID';
  const request = await db.Request.findById(id);
  if (!request) throw 'Request not found'
  response['hasViewed'] = false
  Object.assign(request, response);
  await request.save();
  return request;
}

async function deleteById(id) {
  const request = await getRequest(id);
  await db.Request.deleteMany({ user: id });
  return request;
}

// helper functions

async function getRequest(id) {
  if (!db.isValidId(id)) throw 'Invalid ID';
  const user = await db.Request.findOne({ user: id });
  if (!user) throw 'User not found';
  return user;
}

function getAllFormat(request) {
  let { _id, user, title, subject, body, createdAt } = request;
  return { id: _id, user, title, subject, body, createdAt };
}

function getByUserIDFormat(request) {
  let { _id, user, title, subject, body, hasViewed, createdAt, response } = request;
  return { id: _id, user, title, subject, body, response, hasViewed, createdAt };
}