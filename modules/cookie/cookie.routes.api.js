const router = require('express').Router();
const { query } = require('express');
const { v4: uuidv4 } = require('uuid');
const Controller = require('./cookie.controller');
const HistoryController = require('../history/history.controller');

router.post('/', (q, r, n) => {
  const payload = q.body;
  payload.name = uuidv4();
  Controller.add(payload)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/', (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const cookieName = q.query.cookieName || null;
  const user = q.query.user || null;
  // const filterPreferenceUser = !!(q.query && q.query.preferenceCheck === 'userPreference');
  let filter;
  if (q.query && q.query.preferenceCheck === 'userHistory') {
    filter = 'userHistory';
  } else if (q.query && q.query.preferenceCheck === 'userPreference') {
    filter = 'userPreference';
  }

  Controller.list({
    start,
    limit,
    cookieName,
    user,
    filter
  })
    .then(d => {
      r.json(d);
    })
    .catch(e => n(e));
});

router.get('/:name', (q, r, n) => {
  Controller.getByName(q.params.name)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/id/:id', (q, r, n) => {
  Controller.getById(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/id/:id', (q, r, n) => {
  Controller.getByIdAndUpdate(q.params.id, q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.patch('/:name', (q, r, n) => {
  Controller.updateCookieUserName(q.params.name, q.body.username)
    .then(d => r.json(d))
    .catch(e => console.log(e));
});

router.post('/:name', async (q, r, n) => {
  Controller.updatePreference(q.params.name, q.body.data)
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
