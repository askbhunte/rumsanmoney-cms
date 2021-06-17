const router = require('express').Router();
const Controller = require('./cookie.controller');

router.post('/', (q, r, n) => {
  const payload = q.body;
  Controller.add(payload)
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

router.get('/:id', (q, r, n) => {
  Controller.getById(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
