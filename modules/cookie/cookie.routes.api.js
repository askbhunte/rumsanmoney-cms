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
  const filterPreferenceUser = !!(q.query && q.query.preferenceCheck === 'userPreference');

  if (q.query.preferenceCheck === 'userHistory') {
    Controller.list({
      start,
      limit: 900000,
      cookieName,
      user
    })
      .then(async d => {
        const hasHistoryArr = [];
        d.data.forEach(async el => {
          const dd = await HistoryController.list({ start: 0, limit: 20, cookie: el._id });
          if (dd.data.length > 0) {
            hasHistoryArr.push(el);
          }
        });
        setTimeout(async () => {
          const ddata = {
            data: hasHistoryArr,
            total: hasHistoryArr.length,
            limit: '10000',
            start: '0',
            page: 1
          };
          r.json(ddata);
        }, 50);
      })
      .catch(e => n(e));
  } else {
    Controller.list({
      start,
      limit,
      cookieName,
      user,
      filterPreferenceUser
    })
      .then(d => {
        r.json(d);
      })
      .catch(e => n(e));
  }
});

router.get('/:name', (q, r, n) => {
  Controller.getByName(q.params.name)
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
