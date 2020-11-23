const mongoose = require('mongoose');
const Model = require('./product.model');

const { ObjectId } = mongoose.Types;
const {
  DataUtils,
} = require('../../utils');

class Controller {
  list({
    start, limit, name, bankname, loantype, baserate,
  }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    if (bankname) {
      query.push({
        $match: {
          bank_id: ObjectId(bankname),
        },
      });
    }
    if (baserate) {
      query.push({
        $match: {
          base_rate: baserate,
        },
      });
    }
    if (loantype) {
      query.push({
        $match: {
          loan_type: new RegExp(loantype, 'gi'),
        },
      });
    }
    return DataUtils.paging({
      start,
      limit,
      query,
      model: Model,
      sort: { created_at: 1 },
    });
  }

  async findById(id) {
    const data = await Model.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      }, {
        $lookup: {
          from: 'banks',
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bank_info',
        },
      }, {
        $unwind: {
          path: '$bank_info',
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    const [resp] = data;
    return resp;
  }

  add(payload) {
    return Model.create(payload);
  }

  update(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  changeStatus(id, status) {
    return Model.findOneAndUpdate(
      { _id: id }, { $set: status }, { new: true },
    );
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
