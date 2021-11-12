const { DataUtils } = require('../../utils');
const Model = require('./cookie.model');

class Controller {
  add(payload) {
    if (payload && payload.device.includes('Googlebot')) throw new Error('Bot not allowed!');
    return Model.create(payload);
  }

  async list({ start, limit, user, cookieName, filter }) {
    const query = [];
    if (user) {
      query.push({
        $match: {
          user: new RegExp(user, 'gi')
        }
      });
    }
    if (cookieName) {
      query.push({
        $match: {
          name: new RegExp(cookieName, 'gi')
        }
      });
    }
    if (filter === 'userPreference') {
      query.push({
        $match: {
          preference: { $exists: true, $not: { $size: 0 } }
        }
      });
    } else if (filter === 'userHistory') {
      query.push({
        $match: {
          has_history: true
        }
      });
    }
    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: Model,
      query
    });
  }

  getById(id) {
    return Model.findOne({ _id: id });
  }

  getByIdAndUpdate(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  getByName(name) {
    return Model.findOne({ name });
  }

  updateCookieUserName(cookieName, username) {
    return Model.findOneAndUpdate({ name: cookieName }, { user: username });
  }

  updatePreference(cookieName, preference) {
    return Model.findOneAndUpdate({ name: cookieName }, { $push: { preference } }, { new: true });
  }
}

module.exports = new Controller();
