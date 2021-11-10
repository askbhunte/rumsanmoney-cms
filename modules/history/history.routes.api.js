const router = require('express').Router();

const Controller = require('./history.controller');
const CookieController = require('../cookie/cookie.controller');

router.get('/:id', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const cookie = q.params.id;
  Controller.list({ start, limit, cookie })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', async (q, r, n) => {
  const cookieDetail = await CookieController.getById(q.body.cookie);
  if (cookieDetail.has_history === false) {
    await CookieController.getByIdAndUpdate(q.body.cookie, { has_history: true });
  }
  Controller.add(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
