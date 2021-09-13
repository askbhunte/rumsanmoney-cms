const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    cookie: { type: ObjectId, ref: 'Cookies' },
    data: { type: mongoose.Schema.Types.Mixed }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Histories', Schema);
