const { DataUtils } = require('../../utils');
const Model = require('./cookie.model');

class Controller {
  add(payload) {
    return Model.create(payload);
  }

  list({ start, limit, search }) {
    const query = [];

    if (search) {
      query.push({
        $match: {
          device: new RegExp(search, 'gi'),
        },
      });
    }

    return DataUtils.paging({
      start, limit, sort: { created_at: -1 }, model: Model, query,
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
