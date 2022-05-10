const mongoose = require('mongoose');
const { Schema } = mongoose;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },

  email: {
    type: String,
    unique: [true, 'Can not accept duplicate emails'],
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter valid email address'],
    trim: true,
    lowercase: true
  },

  passwordHash: String,

  image: String,

  isActive: { type: Boolean, default: true },

  isVerified: { type: Boolean, default: false, },

  role: {
    type: String,
    enum: ['facilitator', 'admin', 'user'],
    default: 'user'
  },

  accountNumber: String,

  accountName: String,

  phoneNumber: String,

  bank: String,

  state: String,

  city: String

}, { timestamps: true });


schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  }
});

schema.plugin(aggregatePaginate);

module.exports = mongoose.model('User', schema);