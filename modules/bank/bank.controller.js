const Model = require('./bank.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({
    start, limit, name, status,
  }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    if (status) {
      query.push({
        $match: {
          is_active: status,
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      model: Model,
      query,
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
