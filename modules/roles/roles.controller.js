const mongoose = require('mongoose');
const { RoleManager } = require('rs-user');

const { DataUtils } = require('../../utils');

class RoleController extends RoleManager {
  async list({ start, limit, name }) {
    const query = [];
    if (name) {
      query.push({
        $match: new RegExp(name, 'gi')
      });
    }
    query.push({
      $project: {
        name: 1,
        permissions: 1,
        expiry_date: 1,
        is_system: 1
      }
    });
    return DataUtils.paging({
      start,
      limit,
      sort: { name: 1 },
      model: this.model,
      query
    });
  }

  async listAvailablePermissions({ name, start, limit }) {
    return DataUtils.paging({
      start,
      limit,
      sort: { name: 1 },
      model: this.model,
      query: [
        {
          $match: {
            name
          }
        },
        {
          $project: {
            permissions: 1,
            _id: 0
          }
        },
        {
          $unwind: '$permissions'
        },
        { $group: { _id: null, permissions: { $addToSet: '$permissions' } } }
      ]
    });
  }
}

module.exports = new RoleController({ mongoose });
