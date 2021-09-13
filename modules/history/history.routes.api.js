const router = require('express').Router();

const Controller = require('./history.controller');

router.get('/:id', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const cookie = q.params.id;
  Controller.list({ start, limit, cookie })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', (q, r, n) => {
  Controller.add(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
