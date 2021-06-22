const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Controller = require('./cookie.controller');

router.post('/', (q, r, n) => {
  const payload = q.body;
  payload.name = uuidv4();
  Controller.add(payload)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const search = q.query.search || null;
  Controller.list({ start, limit, search })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/:name', (q, r, n) => {
  Controller.getByName(q.params.name)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
