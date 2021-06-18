const router = require('express').Router();
const Controller = require('./cookie.controller');
const { v4: uuidv4 } = require('uuid');


router.post('/', (q, r, n) => {  
  const payload = q.body; 
  console.log(q.clientIp);
  payload.name = uuidv4();  
  payload.ip = q.clientIp;
  console.log(payload);
  Controller.add(payload)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  Controller.list({ start, limit })
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

router.get('/:name', (q, r, n) => {
  Controller.getByName(q.params.name)
    .then((d) => r.json(d))
    .catch((e) => n(e));
});

module.exports = router;
