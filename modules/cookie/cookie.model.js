const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    ipAddress: { type: String, required: true },
    device: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    referral: { type: String },
    // value: { type: String, required: true },
  },
);

module.exports = mongoose.model('Cookies', Schema);
