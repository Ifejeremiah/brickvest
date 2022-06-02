const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },

  message: String,

  newPush: { type: Boolean, default: true },

  userViewed: { type: Boolean, default: false },

  adminViewed: { type: Boolean, default: false }

}, { timestamps: true });


schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
  }
});

module.exports = mongoose.model('Notification', schema);