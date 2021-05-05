const insuranceModel = require('../insurance/insurance.model');
const productModel = require('../product/product.model');

const { DataUtils } = require('../../utils');

class Controller {
  async list({ type }) {
    const insuranceQuery = [{
      $lookup: {
        from: 'insurances_companies',
        localField: 'company',
        foreignField: '_id',
        as: 'companyInfo',
      },
    },
    {
      $unwind: {
        path: '$companyInfo',
        preserveNullAndEmptyArrays: false,
      },
    }];
    const productQuery = [{
      $lookup: {
        from: 'banks',
        localField: 'bank_id',
        foreignField: '_id',
        as: 'bankInfo',
      },
    },
    {
      $unwind: {
        path: '$bankInfo',
        preserveNullAndEmptyArrays: false,
      },
    }];
    if (type === 'popular') {
      productQuery.push({
        $match: { is_popular: true },
      });
      insuranceQuery.push({
        $match: { is_popular: true },
      });
      const popularInsurances = await DataUtils.paging({
        start: 0,
        limit: 100,
        query: insuranceQuery,
        model: insuranceModel,
        sort: { updated_at: 1 },
      });
      const popularProducts = await DataUtils.paging({
        start: 0,
        limit: 100,
        query: productQuery,
        model: productModel,
        sort: { updated_at: 1 },
      });
      return popularInsurances.data.concat(popularProducts.data);
    }
    productQuery.push({
      $match: { is_featured: true },
    });
    insuranceQuery.push({
      $match: { is_featured: true },
    });
    const featuredInsurances = await DataUtils.paging({
      start: 0,
      limit: 100,
      query: insuranceQuery,
      model: insuranceModel,
      sort: { updated_at: 1 },
    });
    const featuredProducts = await DataUtils.paging({
      start: 0,
      limit: 100,
      query: productQuery,
      model: productModel,
      sort: { updated_at: 1 },
    });
    return featuredInsurances.data.concat(featuredProducts.data);
  }
}

module.exports = new Controller();
