const router = require("express").Router();
const Controller = require("./category.controller");

router.get("/", async (q, r, n) => {
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const status = q.query.status || null;
  const type = q.query.type || null;
  Controller.list({
    limit,
    start,
    status,
    name,
    type,
  })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get("/web", async (q, r, n) => {
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const status = q.query.status || null;
  Controller.weblist({
    limit,
    start,
    status,
    name,
  })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get("/preference", async (q, r, n) => {
  const data = q.body || {};
  Controller.categoryByPreference(data)
    .then((d) => {
      r.json(d);
    })
    .catch((e) => n(e));
});

router.get("/:id", async (q, r, n) => {
  Controller.findById(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.post("/", async (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put("/:id", async (q, r, n) => {
  Controller.update(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put("/:id/featured", async (q, r, n) => {
  Controller.changeFeatured(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put("/:id/popular", async (q, r, n) => {
  Controller.changePopular(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put("/:id/status", async (q, r, n) => {
  Controller.changeStatus(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.delete("/:id", async (q, r, n) => {
  Controller.remove(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
