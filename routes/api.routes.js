const router = require('express').Router();
const Controller = require('./controller');

router.get('/all-data', async (req, res, next) => {
  try {
    const bank = req.query.bank || null;
    const type = req.query.type || null;
    const productName = req.query.productName || null;
    const data = await Controller.getAllData(bank, type, productName);
    res.json(data);
  } catch (e) { next(e); }
});

router.get('/loan-type', async (req, res, next) => {
  try {
    const type = req.query.type || null;
    const data = await Controller.getAllLoanType(type);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/bank-names', async (req, res, next) => {
  try {
    const data = await Controller.getLookup();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
