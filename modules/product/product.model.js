const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bank_id: { type: ObjectId, ref: 'Banks' },
    description: { type: String, required: true },
    category: [{ type: ObjectId, ref: 'Categories' }],
    loan_type: { type: String, required: true },
    interest_rate: [{ type: ObjectId, ref: 'Interests' }],
    base_rate: { type: Number, required: true },
    is_active: { type: Boolean, required: true },
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
