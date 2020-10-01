const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    is_active: { type: Boolean, required: true },
  },
  {
    collection: 'categories',
    toObject: {
      virtuals: true,
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Categories', Schema);
