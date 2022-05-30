const mongoose = require('mongoose');
const { Schema } = mongoose;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema({
  name: { type: String, required: true },

  image: {
    type: String
  },

  location: {
    type: String
  },

  yearBuilt: {
    type: Number
  },

  size: {
    type: Number
  },

  description: {
    type: String
  },

  totalUnits: {
    type: Number
  },

  unitsAvailable: {
    type: Number
  },

  costPerUnit: {
    type: Number
  },

  status: {
    type: String,
    enum: ['soldOut', 'available'],
    default: 'available'
  },

  ROIEstimate: {
    type: Number
  },

  isPrivate: {
    type: Boolean,
    default: true
  },

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },

  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },

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

schema.plugin(aggregatePaginate);

module.exports = mongoose.model('Property', schema);