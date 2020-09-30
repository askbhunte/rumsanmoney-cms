const router = require('express').Router();
const Controller = require('./blog.controller');

router.get('/', async (q, r, n) => {
  console.log('inside tags routes api get all');
  const limit = q.query.limit || 20;
  const start = q.query.start || 0;
  const search = q.query.search || null;
  Controller.list({
    limit,
    start,
    search,
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
  console.log('inside tags routes api add');
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
  console.log('inside tags routes api delete', q.params.id);
  Controller.remove(q.params.id)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
