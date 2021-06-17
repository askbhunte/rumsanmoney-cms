const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    cookieId: { type: ObjectId, ref: 'Cookies', required: true },
    history: [],
  },
);

module.exports = mongoose.model('Histories', Schema);
