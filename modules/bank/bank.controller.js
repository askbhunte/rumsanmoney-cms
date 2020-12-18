const Model = require("./bank.model");
const { DataUtils } = require("../../utils");

class Controller {
  async list({ start, limit, name, address }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, "gi")
        }
      });
    }
    if (address) {
      query.push({
        $match: {
          address: new RegExp(address, "gi")
        }
      });
    }

    let data = await DataUtils.paging({
      start,
      limit,
      sort: { created_at: 1 },
      model: Model,
      query
    });
    let originalData = data.data;
    originalData.map(el => {
      let bankName = el.name;
      el.slug = bankName
        .toLowerCase()
        .split(" ")
        .join("-");
    });
    return originalData;
  }

  listnoDesc({ start, limit, name, address }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, "gi")
        }
      });
    }
    if (address) {
      query.push({
        $match: {
          address: new RegExp(address, "gi")
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

  findById(id) {
    return Model.findById(id);
  }

  findBySlug(slug) {
    return Model.findOne({ slug });
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

  findBook(name) {
    return Model.find({ name: new RegExp(name, "gi") });
  }
}

module.exports = new Controller();
