const router = require('express').Router();
const Controller = require('./featured.controller');

router.get('/', async (q, r, n) => {
  const type = q.query.type || null;
  Controller.list({
    type,
  })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
