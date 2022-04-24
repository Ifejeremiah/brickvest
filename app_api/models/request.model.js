const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  title: String,

  subject: String,

  body: String

}, { timestamps: true });


schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.id;
  }
});


module.exports = mongoose.model('Request', schema);