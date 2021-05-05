const insuranceModel = require('../insurance/insurance.model');
const productModel = require('../product/product.model');

class Controller {
  async list({ type }) {
    if (type === 'popular') {
      const popularInsurances = await insuranceModel.find({ is_popular: true });
      const popularProducts = await productModel.find({ is_popular: true });
      return popularInsurances.concat(popularProducts);
    }
    const featuredInsurances = await insuranceModel.find({ is_featured: true });
    const featuredProducts = await productModel.find({ is_featured: true });
    return featuredInsurances.concat(featuredProducts);
  }
}

module.exports = new Controller();
