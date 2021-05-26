// const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const PagesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String },
    status: {
      type: String,
      required: true,
      default: 'DRAFT',
      enum: ['DRAFT', 'PUBLISHED'],
    },
  },
  {
    collection: 'pages',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Pages', PagesSchema);
