const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String },
    required_docs: { type: String },
    extras: { type: String },
    is_active: { type: Boolean, required: true, default: true },
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
