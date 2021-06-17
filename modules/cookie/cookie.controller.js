const { DataUtils } = require('../../utils');
const Model = require('./cookie.model');

class Controller {
  add(payload) {
    return Model.create(payload);
  }

  list({ start, limit }) {
    const query = [];
    return DataUtils.paging({
      start, limit, sort: { createdAt: 1 }, model: Model, query,
    });
  }

  getById(id) {
    return Model.findById(id);
  }
}

module.exports = new Controller();
