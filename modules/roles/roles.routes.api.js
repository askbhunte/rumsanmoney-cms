const router = require('express').Router();
const RoleController = require('./roles.controller');

router.get('/', async (q, r, n) => {
  const start = q.query.start || 0;
  const limit = q.query.limit || 20;
  const name = q.query.name || null;
  RoleController.list({ start, limit, name })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/:id', async (q, r, n) => {
  RoleController.get(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/', async (q, r, n) => {
  RoleController.add(q.body)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id', async (q, r, n) => {
  RoleController.remove(q.params.id)
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.post('/:id/permissions', (q, r, n) => {
  RoleController.addPermission({ id: q.params.id, permissions: q.body.permissions })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.delete('/:id/permissions', (q, r, n) => {
  RoleController.removePermission({ id: q.params.id, permissions: q.body.permissions })
    .then(d => r.json(d))
    .catch(e => n(e));
});

router.get('/:name/permissions', async (q, r, n) => {
  try {
    const permissions = await RoleController.calculatePermissions(q.params.name);
    let data = [];
    data = [...permissions];
    const total = data.length;
    data = data.map(d => ({
      permissions: d
    }));
    r.json({ data, total });
  } catch (e) {
    n(e);
  }
});

module.exports = router;
