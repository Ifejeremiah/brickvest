const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { db, build } = require('../config');

module.exports = {
  authenticate,
  register,
  saveUser,
  getAll,
  getById,
  updateById,
  updatePassword,
  deleteById
};

async function authenticate({ email, password }) {
  const user = await db.User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) throw 'Email or password is incorrect';
  const jwtToken = generateJwtToken(user);
  return {
    ...basicDetails(user),
    jwtToken,
  };
}

async function register({ name, email, password }) {
  const exists = await db.User.findOne({ email });
  if (exists) throw 'User already exists';
  const user = await saveUser({ name, email, password });
  const jwtToken = generateJwtToken(user);
  return {
    ...basicDetails(user),
    jwtToken,
  };
}

async function getAll(page) {
  const query = db.User.aggregate();
  const customLabels = { totalDocs: 'totalResults', limit: 'perPage', page: 'currentPage' };
  const options = { page: page ? page : 1, limit: 10, customLabels }
  const users = await db.User.aggregatePaginate(query, options);
  return build(users, basicDetails);
}

async function getById(id) {
  const user = await getUser(id);
  return basicDetails(user);
}

async function updateById(id, body) {
  const user = await updateUser(id, body);
  return {
    ...basicDetails(user)
  };
}

async function deleteById(id) {
  const user = await getUser(id);
  await db.User.findByIdAndDelete(user.id);
  return {
    ...basicDetails(user),
  };
}


// helper functions

async function saveUser({ name, email, password }) {
  return db.User.create({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 12)
  });
}

async function updateUser(id, body) {
  const { email, password } = body;
  const user = await getUser(id);

  if (email) {
    const exists = await db.User.findOne({ email });
    if (exists && user.email !== exists.email) throw 'Email already in use';
  } else if (password) {
    body['password'] = bcrypt.hashSync(password, 12)
  }

  Object.assign(user, body);
  await user.save();
  return user;
}

async function updatePassword(id, current, update) {
  const user = await getUser(id)
  if (!bcrypt.compareSync(current, user.passwordHash)) throw 'Password is incorrect'
  user['passwordHash'] = bcrypt.hashSync(update, 12)
  await user.save();
  return user;
}

async function getUser(id) {
  if (!db.isValidId(id)) throw 'User not found';
  const user = await db.User.findById(id);
  if (!user) throw 'User not found';
  return user;
}

function generateJwtToken(user) {
  // create a jwt token containing the user id that expires in 60 minutes
  return jwt.sign({ id: user.id }, secret, { expiresIn: '60mins' });
}

function basicDetails(user) {
  let { id, name, email, role } = user;
  if (!id) id = user._id
  return { id, name, email, role };
}