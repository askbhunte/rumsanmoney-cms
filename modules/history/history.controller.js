const Model = require('./history.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({ start, limit }) {
    const query = [];
    return DataUtils.paging({
      start, limit, query, model: Model,
    });
  }

  add(payload) {
    return Model.create(payload);
  }
}

module.exports = new Controller();
