const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Banks', Schema);
