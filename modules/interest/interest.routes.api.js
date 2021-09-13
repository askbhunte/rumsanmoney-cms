const router = require('express').Router();
const Controller = require('./interest.controller');

router.get('/', async (q, r, n) => {
  const limit = q.limit || 20;
  const start = q.start || 0;
  Controller.list({ start, limit })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/:id', async (q, r, n) => {
  const { id } = q.params;
  Controller.findById(id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', async (q, r, n) => {
  Controller.add(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id', async (q, r, n) => {
  const { id } = q.params;
  Controller.remove(id)
    .then(d => r.json(d))
    .catch(e => n(e));
});
