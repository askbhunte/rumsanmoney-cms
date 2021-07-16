const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    ip: { type: String, required: true },
    device: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    referral: { type: String },
    user: { type: String },
  },
);

module.exports = mongoose.model('Cookies', Schema);
