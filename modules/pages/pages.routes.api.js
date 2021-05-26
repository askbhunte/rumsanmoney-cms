const router = require("express").Router();
const Controller = require("./pages.controller");

router.post("/", async (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});


module.exports = router;
