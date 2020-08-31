const router = require('express').Router();
const Controller = require('./controller');

router.get('/all-data', async (req, res, next) => {
  try {
    const bank = req.query.bank || null;
    const type = req.query.type || null;
    const data = await Controller.getAllData(bank, type);
    res.json(data);
  } catch (e) { next(e); }
});


module.exports = router;
