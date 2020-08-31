const router = require('express').Router();
const Controller = require('./controller');

router.get('/', async (req, res) => {
  res.render('index', { title: 'Welcome to Chino Loan Website' });
});

router.get('/compare', async (req, res, next) => {
  try {
    
    const bank_one = req.query.bank_one || null;
    const bank_two = req.query.bank_two || null;
    const bank_three = req.query.bank_three || null;
    const data = await Controller.compareBanks(bank_one, bank_two, bank_three);
    
    res.render('compare', { title: 'Welcome to Chino Loan Website' , data});
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;
