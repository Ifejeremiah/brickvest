const mongoose = require('mongoose');
const { Schema } = mongoose;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

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

schema.plugin(aggregatePaginate);

module.exports = mongoose.model('Activity', schema);