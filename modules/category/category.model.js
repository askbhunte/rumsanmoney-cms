const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    icon: { type: String, required: true },
    sub_head: { type: String },
    tags: [],
    image: { type: String },
    description: { type: String },
    required_docs: { type: String },
    type: { type: String, enum: ['loan', 'savings', 'insurance'] },
    extras: { type: String },
    isFeatured: { type: Boolean, required: true, default: false },
    isPopular: { type: Boolean, required: true, default: false },
    is_active: { type: Boolean, required: true, default: true }
  },
  {
    collection: 'categories',
    toObject: {
      virtuals: true
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    toJson: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model('Categories', Schema);
