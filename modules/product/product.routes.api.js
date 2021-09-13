const router = require('express').Router();
const Controller = require('./product.controller');

router.get('/', async (q, r, n) => {
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const name = q.query.name || null;
  const producttype = q.query.ptype || null;
  const bankname = q.query.bankname || null;
  const baserate = q.query.baserate || null;
  const bankId = q.query.bankId || null;
  const type = q.query.type || null;
  const category = q.query.category || null;
  const sortinasc = q.query.sortinasc || null;
  const sortindesc = q.query.sortindesc || null;

  Controller.list({
    limit,
    start,
    name,
    producttype,
    bankId,
    bankname,
    baserate,
    type,
    category,
    sortinasc,
    sortindesc
  })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/:id', async (q, r, n) => {
  Controller.findById(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/slug/:bank/:product', async (q, r, n) => {
  Controller.findBySlug(q.params.bank, q.params.product)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', async (q, r, n) => {
  Controller.add(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/:id', async (q, r, n) => {
  Controller.update(q.params.id, q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/:id/status', async (q, r, n) => {
  Controller.changeStatus(q.params.id, q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/:id/featured', async (q, r, n) => {
  Controller.changeFeatured(q.params.id, q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/:id/date', async (q, r, n) => {
  Controller.updateDate(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id', async (q, r, n) => {
  Controller.remove(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
