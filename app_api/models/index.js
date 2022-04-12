const mongoose = require('mongoose');


mongoose.connect(
  process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(connect => {
  console.log(`MongoDB Connected: ${connect.connection.host}`)
}).catch(err => {
  console.error(err)
  process.exit(1)
});


require('./users.model');