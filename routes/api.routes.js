const router = require('express').Router();
// const Controller = require('./controller');

router.get('/', async (req, res, next) => {
  try {
    res.render('index', { title: 'Welcome to Chino Loan Website API' });
  } catch (e) { next(e); }
});

module.exports = router;
