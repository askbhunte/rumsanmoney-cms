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
    const query = [
      {
        $project: {
          required_docs: 0,
          extras: 0,
        },
      },
    ];
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

  async categoryByPreference(data) {
    const preferenceModel = Object.values(data);
    const rawCategory = await Model.find({
      is_active: true,
      tags: { $in: preferenceModel },
    });
    // TODO order the category data as per bibek
    const sortedCategory = rawCategory.sort((a, b) => (a.type === b.type ? 0 : a.type === 'loan' ? 1 : -1));
    return sortedCategory.reverse();
  }

  findById(id) {
    return Model.findById(id);
  }

  add(payload) {
    payload.slug = payload.name
      .toLowerCase()
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

  changeFeatured(id, status) {
    return Model.findOneAndUpdate({ _id: id }, { $set: status }, { new: true });
  }

  changePopular(id, status) {
    return Model.findOneAndUpdate({ _id: id }, { $set: status }, { new: true });
  }

  changeStatus(id, status) {
    return Model.findOneAndUpdate({ _id: id }, { $set: status }, { new: true });
  }

  findByName(name) {
    return Model.findOne({ name: new RegExp(name, 'gi') });
  }
}

module.exports = new Controller({ mongoose });
