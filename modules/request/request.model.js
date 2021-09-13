const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    product: String,
    product_detail: String,
    bank: String,
    is_contacted: { type: Boolean, required: true, default: false },
    extras: { type: Object }
  },
  {
    collection: 'requests',
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

module.exports = mongoose.model('Requests', Schema);
