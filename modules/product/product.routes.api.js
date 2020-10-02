const router = require('express').Router();
const Controller = require('./product.controller');

router.get('/', async (q, r, n) => {
  console.log('inside product routes api get all');
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const status = q.query.status || null;
  const bankId = q.query.bank || null;
  const categoryId = q.query.category || null;
  Controller.list({
    limit,
    start,
    name,
    status,
    bankId,
    categoryId,
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
  console.log('inside product routes api add');
  console.log(q.body);
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
  console.log('inside product routes api delete', q.params.id);
  Controller.remove(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
