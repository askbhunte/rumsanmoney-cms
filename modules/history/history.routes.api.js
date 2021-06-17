const router = require('express').Router();

const Controller = require('./history.controller');

router.post('/', (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/', (q, r, n) => {
  Controller.add(q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.put('/:id', (q, r, n) => {
  Controller.addHistory(q.params.id, q.body)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
