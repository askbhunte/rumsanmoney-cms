const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
