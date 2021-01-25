const mongoose = require("mongoose");
const config = require("config");
const { UserManager } = require("rs-user");
const { DataUtils } = require("../../utils");

class UserController extends UserManager {
  async login(request) {
    const loginData = await this.authenticate(request);

    if (!loginData.is_active) throw ERR.USER_INACTIVE;

    return { loginData };
  }

  list({ start, limit, isEmployee, name }) {
    const query = [];
    if (name) {
      query.push({
        $match: {
          "name.first": new RegExp(name, "gi"),
        },
      });
    }
    query.push(
      {
        $match: {
          is_active: true,
        },
      },
      {
        $lookup: {
          from: "users_comm",
          localField: "comms",
          foreignField: "_id",
          as: "comms",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          full_name: { $concat: ["$name.first", " ", "$name.last"] },
          comms: {
            $filter: {
              input: "$comms",
              as: "item",
              cond: {
                $eq: ["$$item.is_primary", true],
              },
            },
          },
          organization: 1,
          is_approved: 1,
          is_active: 1,
          created_at: 1,
          updated_at: 1,
        },
      }
    );
    console.log(query);
    if (isEmployee) {
      query.push({
        $match: {
          is_employee: isEmployee,
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { "name.first": 1 },
      model: this.models.UserModel,
      query,
    });
  }

  update(id, payload) {
    return this.models.UserModel.findByIdAndUpdate(id, payload);
  }
}

module.exports = new UserController({
  mongoose,
  appSecret: config.get("app.secret"),
});
