const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('index', { title: 'Welcome to Chino Loan Website' });
});

module.exports = router;
