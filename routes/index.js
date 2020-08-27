const router = require('express').Router();

const ui = require('./pages.routes');
const apiV1 = require('./api.routes');

router.use('/', ui);
router.use('/api/v1', apiV1);

module.exports = router;
