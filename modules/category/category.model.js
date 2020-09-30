const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    created_by: { type: ObjectId, ref: 'Users' },
    updated_by: { type: ObjectId, ref: 'Users' },
  },
  {
    collection: 'categories',
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Categories', Schema);
