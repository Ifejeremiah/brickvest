const mongoose = require('mongoose');
const { Schema } = mongoose;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema({
  name: { type: String, required: true },

  image: String,

  location: { type: String, required: true },

  yearBuilt: Number,

  size: Number,

  description: String,

  totalUnits: { type: Number, required: true },

  unitsAvailable: { type: Number, required: true },

  costPerUnit: { type: Number, required: true },

  status: {
    type: String,
    enum: ['soldOut', 'available'],
    default: 'available'
  },

  ROIEstimate: Number,

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },

  updatededBy: { type: Schema.Types.ObjectId, ref: 'User' },

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