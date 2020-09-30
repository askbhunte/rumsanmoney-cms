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
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    created_by: { type: ObjectId, ref: 'Users' },
    updated_by: { type: ObjectId, ref: 'Users' },
  },
  {
    collection: 'blogs',
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Blogs', Schema);
