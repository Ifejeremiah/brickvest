const { db, build, paginate } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  getById,
  save,
  updateById,
  deleteById,
  deleteByUserId
}

async function getAll(page, limit) {
  const requests = await paginate(
    db.Request, true,
    {}, page, limit
  )
  return build(requests, format);
}

async function getById(id, isAdmin) {
  console.log('Here is the result:', isAdmin)
  const request = await getRequest(id)
  if (isAdmin) {
    Object.assign(request, { adminViewed: true })
    await request.save()
  } else {
    Object.assign(request, { userViewed: true })
    await request.save()
  }
  return format(request);
}

async function getByUserId(id, page, limit) {
  await getUserRequest(id)
  const requests = await paginate(
    db.Request, true,
    { user: db.ObjectId(id) },
    page, limit
  )
  return build(requests, format);
}

async function save({ id, title, subject, body }) {
  return await db.Request.create({ user: id, title, subject, body });
}

async function updateById(id, response) {
  const request = await getRequest(id)
  response['hasViewed'] = false
  Object.assign(request, response);
  await request.save();
  return request;
}

async function deleteByUserId(id) {
  const request = await getUserRequest(id);
  await db.Request.deleteMany({ user: id });
  return request;
}

async function deleteById(id) {
  const request = await getRequest(id);
  await db.Request.findByIdAndDelete(id);
  return request;
}

// helper functions

async function getRequest(id) {
  if (!db.isValidId(id)) throw 'Invalid request id';
  const request = await db.Request.findById(id).populate('user');
  if (!request) throw 'Request not found';
  return request;
}

async function getUserRequest(id) {
  if (!db.isValidId(id)) throw 'Invalid user id';
  const user = await db.Request.findOne({ user: id });
  if (!user) throw 'User request not found';
  return user;
}

function format(request) {
  let { _id, user, title, subject, body, createdAt, response, repliedBy, responseTime, adminViewed, userViewed, } = request;
  return { id: _id, user, title, subject, body, response, createdAt, responseTime, repliedBy, adminViewed, userViewed, };
}
