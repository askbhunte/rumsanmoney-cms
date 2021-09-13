const Model = require('./pages.model');
const { DataUtils } = require('../../utils');
const slugify = require('slugify');

class Controller {
  async list({ start, limit, name }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi')
        }
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      model: Model,
      query
    });
  }

  add(payload) {
    let _slug = slugify(payload.name, {
      remove: /[*+~.()'"#:@!?,]/g,
      replacement: '-',
      lower: true
    });
    payload.slug = _slug;
    return Model.create(payload);
  }

  findById(id) {
    return Model.findById(id);
  }

  findBySlug(slug) {
    return Model.findOne({ slug });
  }

  update(id, payload) {
    if (payload.name) {
      delete payload.slug;
      payload.slug = payload.name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '');
    }
    return Model.findByIdAndUpdate(id, payload);
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
