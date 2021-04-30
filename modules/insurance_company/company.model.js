// const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    slug: String,
    secondary_contacts: { type: String },
    primary_contact: { type: String },
    email: { type: String },
    logo_url: { type: String },
    desc: { type: String },
    website: { type: String },
    is_active: { type: Boolean, required: true, default: true },
    type: String,
    symbol: String,
  },
  {
    collection: 'insurances_companies',
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

module.exports = mongoose.model('InsuranceCompanies', Schema);
