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

  getByName(name) {
    return Model.findOne(
      {
        name,
      },
    );
  }
}

module.exports = new Controller();
