const router = require('express').Router();
const Controller = require('./controller');

router.get('/all-data', async (req,res,next) => {
  try {
    console.log('hello inside all-data');
    console.log(Controller.getAllData('Prime Bank','General Saving'));
    res.render('index');
  } catch (e) { next(e); }
});

module.exports = router;
