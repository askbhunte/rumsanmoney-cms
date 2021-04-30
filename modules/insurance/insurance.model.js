const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    company: { type: ObjectId, ref: 'InsuranceCompanies' },
    image_url: { type: String },
    plink: { type: String },
    subhead: { type: String },
    description: { type: String },
    category: { type: ObjectId, ref: 'Categories' },
    ptype: { type: String },
    tags: [],
    interest_rate: { type: Number },
    is_featured: { type: Boolean, default: false, required: true },
    is_popular: { type: Boolean, default: false, required: true },
    interestId: { type: ObjectId, ref: 'Interests' },
    base_rate: { type: Number, required: true },
    is_active: { type: Boolean, required: true, default: true },
  },
  {
    collection: 'insurances',
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

module.exports = mongoose.model('Insurances', Schema);
