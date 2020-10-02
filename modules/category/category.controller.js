const Model = require('./category.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({
    start, limit, name, status,
  }) {
    const query = [];
    query.push({
      $match: {
        name: new RegExp(name, 'gi'),
      },
    },
    {
      $match: {
        status,
      },
    });
    return DataUtils.paging({
      start, limit, query, model: Model, sort: { created_at: 1 },
    });
  }

  findById(id) {
    return Model.findById(id);
  }

  add(payload) {
    return Model.create(payload);
  }

  update(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
