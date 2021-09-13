const { DataUtils } = require('../../utils');
const Model = require('./cookie.model');

class Controller {
  add(payload) {
    return Model.create(payload);
  }

  list({
    start, limit, user, cookieName, filterPreferenceUser, filterCookieUsers,
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
    if (filterPreferenceUser) {
      query.push({
        $match: {
          preference: { $exists: true, $not: { $size: 0 } },
        },
      });
    }
    if (filterCookieUsers) {
      query.push({
        $lookup: {
          from: 'histories',
          localField: '_id',
          foreignField: 'cookie',
          as: 'analytics',
        },
      });
      query.push({
        $match: {
          analytics: { $exists: true, $not: { $size: 0 } },
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

  updatePreference(cookieName, preference) {
    return Model.findOneAndUpdate({ name: cookieName }, { $push: { preference } }, { new: true });
  }
}

module.exports = new Controller();
