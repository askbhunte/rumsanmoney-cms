const router = require('express').Router();

const apiV1 = require('./api.routes');

router.use('/api/v1', apiV1);

module.exports = router;
