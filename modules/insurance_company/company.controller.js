const Model = require('./company.model');
const { DataUtils } = require('../../utils');

class Controller {
  async list({ start, limit, name, address }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi')
        }
      });
    }
    if (address) {
      query.push({
        $match: {
          address: new RegExp(address, 'gi')
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

  listnoDesc({ start, limit, name, address }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi')
        }
      });
    }
    if (address) {
      query.push({
        $match: {
          address: new RegExp(address, 'gi')
        }
      });
    }
    query.push({
      $project: {
        desc: 0,
        information: 0
      }
    });
    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      model: Model,
      query
    });
  }

  listAll() {
    return Model.find({ is_active: true });
  }

  findById(id) {
    return Model.findById(id);
  }

  findBySlug(slug) {
    return Model.findOne({ slug });
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

  findByName(name) {
    return Model.findOne({ name: new RegExp(name, 'gi') });
  }

  findProductsByCompany({ slug, start, limit }) {
    const query = [];
    query.push(
      {
        $match: {
          slug
        }
      },
      {
        $lookup: {
          from: 'insurances',
          localField: '_id',
          foreignField: 'company',
          as: 'products'
        }
      },
      {
        $unwind: {
          path: '$products',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'products.category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $project: {
          category: 1,
          products: 1,
          _id: 0
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: false
        }
      }
    );
    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      model: Model,
      query
    });
  }
}

module.exports = new Controller();
