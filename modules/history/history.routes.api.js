const router = require('express').Router();

const Controller = require('./history.controller');

router.post('/', (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  Controller.list({ start, limit })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
