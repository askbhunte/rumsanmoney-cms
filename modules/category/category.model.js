const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'categories',
    toObject: {
        virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  },    
);

module.exports = mongoose.model('Categories', Schema);
