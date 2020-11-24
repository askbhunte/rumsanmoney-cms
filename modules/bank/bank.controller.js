const Model = require('./bank.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({
    start, limit, name, address,
  }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    if (address) {
      query.push({
        $match: {
          address: new RegExp(address, 'gi'),
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

  findBook(name) {
    return Model.find({ name: new RegExp(name, 'gi') });
  }
}

module.exports = new Controller();
