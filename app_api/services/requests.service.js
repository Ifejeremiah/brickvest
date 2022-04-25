const { db, build } = require('../config');

module.exports = {
  getAll,
  getByUserId,
  save,
  deleteById
}

async function getAll(page) {
  const query = db.Request.aggregate();
  const customLabels = { totalDocs: 'totalResults', limit: 'perPage', page: 'currentPage' };
  const options = { page: page ? page : 1, limit: 10, customLabels }
  const requests = await db.Request.aggregatePaginate(query, options);
  return build(requests, basicDetails);

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

function basicDetails(request) {
  let { _id, user, title, subject, body } = request;
  return { id: _id, user, title, subject, body };
}