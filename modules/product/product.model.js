const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bank_id: { type: ObjectId, ref: 'Banks' },
    image: { type: String },
    plink: { type: String },
    description: { type: String, required: true },
    category: [{ type: ObjectId, ref: 'Categories' }],
    loan_type: { type: String, required: true },
    interest_rate: [{ type: ObjectId, ref: 'Interests' }],
    base_rate: { type: Number, required: true },
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
