const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bank_id: { type: ObjectId, ref: 'Banks' },
    description: { type: String, required: true },
    category: [{ type: ObjectId, ref: 'Categories' }],
    loan_type: { type: String, required: true },
    interest_rate: { type: Number, required: true },
    base_rate: { type: Number, required: true },
    is_active: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    created_by: { type: ObjectId, ref: 'Users' },
    updated_by: { type: ObjectId, ref: 'Users' },
  },
  {
    collection: 'products',
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Products', Schema);
