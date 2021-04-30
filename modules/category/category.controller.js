const mongoose = require('mongoose');
const Model = require('./category.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({
    start, limit, name, status, type,
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
      status = status === 'true';
      query.push({
        $match: {
          is_active: status,
        },
      });
    }
    if (type === 'featured') {
      const isFeatured = true;
      query.push({
        $match: {
          isFeatured,
        },
      });
    }
    if (type === 'popular') {
      const isPopular = true;
      query.push({
        $match: {
          isPopular,
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

  weblist({
    start, limit, name, status,
  }) {
    const query = [{
      $project: {
        required_docs: 0,
        extras: 0,
      },
    }];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    if (status) {
      status = status === 'true';
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
      query,
      model: Model,
    });
  }

  findById(id) {
    return Model.findById(id);
  }

  add(payload) {
    payload.slug = payload.name.toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '');
    return Model.create(payload);
  }

  update(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }

  findByName(name) {
    return Model.findOne({ name: new RegExp(name, 'gi') });
  }
}

module.exports = new Controller({ mongoose });
