// const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const BankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    head_office: {
      type: String,
      required: true,
    },
    contact_number: {
      type: [],
      required: true,
    },
    primary_contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    logo_url: {
      type: String,
      required: true,
    },
    products: [{ type: ObjectId, ref: 'Products' }],
    website: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      required: true,
    },
    created_by: {
      type: ObjectId,
      ref: 'Products',
    },
    updated_by: {
      type: ObjectId,
      ref: 'Users',
    },
  },
  {
    collection: 'banks',
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('Banks', BankSchema);
