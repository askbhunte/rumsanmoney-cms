const { ObjectId } = require('mongodb');
const slugify = require('slugify');
const Model = require('./blog.model');
const { DataUtils } = require('../../utils');

class Controller {
  list({ start, limit, name, status, categoryId, tagsId, slug }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi')
        }
      });
    }
    if (status) {
      query.push({
        $match: {
          is_active: status
        }
      });
    }
    if (categoryId) {
      query.push({
        $unwind: {
          path: '$category'
        },
        $match: {
          category: ObjectId(categoryId)
        }
      });
    }
    if (tagsId) {
      query.push({
        $unwind: {
          path: '$tags'
        },
        $match: {
          tags: ObjectId(tagsId)
        }
      });
    }
    if (slug) {
      query.push({
        $match: {
          slug
        }
      });
    }
    return DataUtils.paging({
      start,
      limit,
      query,
      model: Model,
      sort: { created_at: 1 }
    });
  }

  findById(id) {
    return Model.findById(id);
  }

  add(payload) {
    if (!payload.slug || payload.slug.length === 0) {
      const _slug = slugify(payload.name, {
        remove: /[*+~.()'"#:@!?,]/g,
        replacement: '-',
        lower: true
      });
      payload.slug = _slug;
    }
    return Model.create(payload);
  }

  update(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
