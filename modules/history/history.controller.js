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

  addHistory(id, payload) {
    return Model.updateOne(
      {
        cookieId: id,
      },
      {
        $push: { history: payload.data },
      },
    );
  }
}

module.exports = new Controller();
