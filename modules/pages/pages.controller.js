const Model = require('./pages.model');
const { DataUtils } = require('../../utils');
const slugify = require("slugify");

class Controller {

  add(payload) {
    let _slug = slugify(payload.name, {
      remove: /[*+~.()'"#:@!?,]/g,
      replacement: "-",
      lower: true,
    });
    payload.slug = _slug;
    return Model.create(payload);
  }
}


module.exports = new Controller();
