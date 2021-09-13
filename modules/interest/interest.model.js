const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const interestSchema = mongoose.Schema(
  {
    rate: Number,
    created_by: { type: ObjectId, ref: 'Users' },
    updated_by: { type: ObjectId, ref: 'Users' }
  },
  {
    collection: 'interests',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model('Interests', interestSchema);
