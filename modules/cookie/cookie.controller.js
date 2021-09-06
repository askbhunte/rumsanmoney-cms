const { DataUtils } = require('../../utils');
const Model = require('./cookie.model');

class Controller {
  add(payload) {
    return Model.create(payload);
  }

  list({
    start, limit, user, cookieName,
  }) {
    const query = [];

    if (user) {
      query.push({
        $match: {
          user: new RegExp(user, 'gi'),
        },
      });
    }
    if (cookieName) {
      query.push({
        $match: {
          name: new RegExp(cookieName, 'gi'),
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

  updateCookieUserName(cookieName, username) {
    return Model.findOneAndUpdate({ name: cookieName }, { user: username });
  }

  websitelist({
    start, limit, name,
  }) {
    const query = [];
    query.push(
      {
        $lookup: {
          from: 'categories',
          localField: 'preference',
          foreignField: 'tags',
          as: 'Preffered_category',
        },
      },
    );
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      query,
      model: Model,
    });
  }
}

module.exports = new Controller();
