const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };



mongoose.connect(process.env.MONGODB_URI, connectionOptions)
  .then(connect => {
    console.log(`MongoDB Connected: ${connect.connection.host}`)
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });

mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user.model'),
  Action: require('../models/activity.model'),
  Request: require('../models/request.model'),
  isValidId
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}