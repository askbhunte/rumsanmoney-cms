const router = require('express').Router();
const UserController = require('./user.controller');

router.get('/', async (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const name = q.query.name || null;

  UserController.list({ start, limit, name })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/:id', async (q, r, n) => {
  const { id } = q.params;

  UserController.getById(id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', async (q, r, n) => {
  UserController.createUsingEmail(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.put('/:id', async (q, r, n) => {
  UserController.update(q.params.id, q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id', async (q, r, n) => {
  UserController.remove(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/:id/roles', async (q, r, n) => {
  UserController.addRole({ user_id: q.params.id, roles: q.body.roles })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id/roles', async (q, r, n) => {
  UserController.removeRole({ user_id: q.params.id, roles: q.body.roles })
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
