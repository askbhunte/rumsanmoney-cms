const router = require('express').Router();
const Controller = require('./product.controller');

router.get('/', async (q, r, n) => {
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const producttype = q.query.type || null;
  const bankname = q.query.bankname || null;
  const baserate = q.query.baserate || null;
  const bankId = q.query.bankId || null;
  const isFeatured = q.query.isFeatured || null;
  const category = q.query.category || null;
  Controller.list({
    limit,
    start,
    name,
    producttype,
    bankId,
    bankname,
    baserate,
    isFeatured,
    category,
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

router.put('/:id/status', async (q, r, n) => {
  Controller.changeStatus(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put('/:id/featured', async (q, r, n) => {
  Controller.changeFeatured(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.delete('/:id', async (q, r, n) => {
  Controller.remove(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
