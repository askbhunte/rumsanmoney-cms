// const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const BankSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    head_office: { type: String },
    secondary_contacts: { type: String },
    primary_contact: { type: String },
    email: { type: String },
    logo_url: { type: String },
    desc: { type: String },
    website: { type: String },
    product_url: { type: String },
    is_active: { type: Boolean, required: true, default: true },
  },
  {
    collection: 'banks',
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

module.exports = mongoose.model('Banks', BankSchema);
