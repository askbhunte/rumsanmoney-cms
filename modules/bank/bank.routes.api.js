const router = require('express').Router();
const Controller = require('./bank.controller');

router.get('/', async (q, r, n) => {
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const status = q.query.status || null;

  Controller.list({
    limit,
    start,
    name,
    status,
  })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/:id', async (q, r, n) => {
  Controller.findById(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.post('/', async (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put('/:id', async (q, r, n) => {
  Controller.update(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.delete('/:id', async (q, r, n) => {
  Controller.remove(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
