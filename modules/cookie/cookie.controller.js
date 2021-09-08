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

  updatePreference(cookieName, preferenceNew) {
    return Model.findOneAndUpdate({ name: cookieName }, { $set: { preference: preferenceNew } }, { new: true });
  }
}

module.exports = new Controller();
