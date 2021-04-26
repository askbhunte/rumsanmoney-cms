const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    bank_id: { type: ObjectId, ref: 'Banks' },
    image_url: { type: String },
    plink: { type: String },
    description: { type: String },
    category: { type: ObjectId, ref: 'Categories' },
    loan_type: { type: String, required: true },
    ptype: { type: String },
    tags: [],
    interest_rate: { type: Number },
    is_featured: { type: Boolean, default: false, required: true },
    ispopular: { type: Boolean, default: false, required: true },
    interestId: { type: ObjectId, ref: 'Interests' },
    base_rate: { type: Number, required: true },
    is_active: { type: Boolean, required: true, default: true },
  },
  {
    collection: 'products',
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

module.exports = mongoose.model('Products', Schema);
