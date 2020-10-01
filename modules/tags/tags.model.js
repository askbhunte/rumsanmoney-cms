const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    excerpt: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    status: { type: String, enum: ['Published', 'Draft', 'Archived'] },
    category: [{ type: ObjectId, ref: 'Categories' }],
    tags: [{ type: ObjectId, ref: 'Tags' }],
  },
  {
    collection: 'tags',
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

module.exports = mongoose.model('Tags', Schema);
