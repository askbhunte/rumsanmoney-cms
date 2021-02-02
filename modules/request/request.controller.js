const { ObjectId } = require("mongodb");
const Model = require("./request.model");
const { DataUtils } = require("../../utils");

class Controller {
  list({ start, limit, name, status, categoryId, tagsId }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, "gi"),
        },
      });
    }
    if (status) {
      query.push({
        $match: {
          is_active: status,
        },
      });
    }
    if (categoryId) {
      query.push({
        $unwind: {
          path: "$category",
        },
        $match: {
          category: ObjectId(categoryId),
        },
      });
    }
    if (tagsId) {
      query.push({
        $unwind: {
          path: "$tags",
        },
        $match: {
          tags: ObjectId(tagsId),
        },
      });
    }
    return DataUtils.paging({
      start,
      limit,
      query,
      model: Model,
      sort: { created_at: 1 },
    });
  }

  findById(id) {
    return Model.findById(id);
  }

  add(payload) {
    return Model.create(payload);
  }

  addFromSite(payload) {
    let mainPayload = {};
    mainPayload.name = payload.full_name;
    mainPayload.phone = payload.phone;
    mainPayload.email = payload.email;
    mainPayload.product = payload.product_name;
    mainPayload.bank = payload.bank_name;
    mainPayload.extras = payload;

    return Model.create(mainPayload);
  }

  update(id, payload) {
    return Model.findByIdAndUpdate(id, payload);
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
