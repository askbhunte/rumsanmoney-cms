const mongoose = require('mongoose');
const Model = require('./insurance.model');

const { ObjectId } = mongoose.Types;
const { DataUtils } = require('../../utils');

class Controller {
  list({
    start,
    limit,
    name,
    companyName,
    type,
    category,
    baserate,
    sortindesc,
    sortinasc,
  }) {
    const query = [];
    const sort = {};
    if (sortindesc) {
      sort[sortindesc] = -1;
    } else if (sortinasc) {
      sort[sortinasc] = 1;
    } else {
      sort.created_at = 1;
    }

    query.push(
      {
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
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryinfo',
        },
      },
      {
        $unwind: {
          path: '$categoryinfo',
          preserveNullAndEmptyArrays: false,
        },
      },
      // {
      //   $addFields: {
      //     total_interest: {
      //       $add: ['$base_rate', '$interest_rate'],
      //     },
      //   },
      // },
    );
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'gi'),
        },
      });
    }
    if (type === 'featured') {
      const is_featured = true;
      query.push({
        $match: {
          is_featured,
        },
      });
    }
    if (type === 'popular') {
      const is_popular = true;
      query.push({
        $match: {
          is_popular,
        },
      });
    }
    if (companyName) {
      query.push({
        $match: {
          'companyInfo.name': new RegExp(companyName, 'gi'),
        },
      });
    }
    if (category) {
      query.push({
        $match: {
          'categoryinfo.name': new RegExp(category, 'gi'),
        },
      });
    }
    if (baserate) {
      baserate = Number(baserate);
      query.push({
        $match: {
          base_rate: baserate,
        },
      });
    }
    console.log(query);
    return DataUtils.paging({
      start,
      limit,
      query,
      model: Model,
      sort,
    });
  }

  async findById(id) {
    const query = [];
    query.push(
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'banks',
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bankinfo',
        },
      },
      {
        $unwind: {
          path: '$bankinfo',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryinfo',
        },
      },
      {
        $unwind: {
          path: '$categoryinfo',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $addFields: {
          total_interest: {
            $round: [
              {
                $add: ['$base_rate', '$interest_rate'],
              },
              2,
            ],
          },
        },
      },
    );
    const resp = await Model.aggregate(query);
    return resp[0];
  }

  async findBySlug(bank, product) {
    const query = [];
    query.push(
      {
        $lookup: {
          from: 'banks',
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bankinfo',
        },
      },
      {
        $unwind: {
          path: '$bankinfo',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryinfo',
        },
      },
      {
        $unwind: {
          path: '$categoryinfo',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $addFields: {
          total_interest: {
            $round: [
              {
                $add: ['$base_rate', '$interest_rate'],
              },
              2,
            ],
          },
        },
      },
      {
        $match: { $and: [{ 'bankinfo.slug': bank }, { slug: product }] },
      },
    );
    const resp = await Model.aggregate(query);
    return resp[0];
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

  changeStatus(id, status) {
    return Model.findOneAndUpdate({ _id: id }, { $set: status }, { new: true });
  }

  changeFeatured(id, status) {
    return Model.findOneAndUpdate({ _id: id }, { $set: status }, { new: true });
  }

  remove(id) {
    return Model.findByIdAndRemove(id);
  }
}

module.exports = new Controller();
