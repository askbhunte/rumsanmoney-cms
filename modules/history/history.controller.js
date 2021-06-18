const mongoose = require('mongoose');
const Model = require('./history.model');
const { DataUtils } = require('../../utils');

const { ObjectId } = mongoose.Types;

class Controller {
  list({ start, limit, cookie }) {
    const query = [];
    if (cookie) {
      query.push({
        $match: { cookie: ObjectId(cookie) },
      });
    }

    return DataUtils.paging({
      start, limit, sort: { created_at: -1 }, query, model: Model,
    });
  }
}

module.exports = new Controller();
