const router = require("express").Router();
const UserController = require("./user.controller");

router.post("/", async (req, res, next) => {
  try {
    // return;
    UserController.login(req.body)
      .then((d) => {
        res.json(d);
      })
      .catch((e) => {
        next(e);
      });
  } catch (e) {
    res.json(e.data);
  }
});

module.exports = router;
