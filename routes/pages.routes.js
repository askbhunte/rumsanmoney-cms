const router = require("express").Router();
const Controller = require("./controller");

router.get("/", async (req, res) => {
  res.render("index", { title: "Welcome to Chino Loan Website" });
});

router.get("/compare", async (req, res, next) => {
  try {
    const bankOne = req.query.bank_one || null;
    const bankTwo = req.query.bank_two || null;
    const bankThree = req.query.bank_three || null;
    console.log('bankOne,bankTwo,bank_three',bankOne,bankTwo,bankThree);
    const data = await Controller.compareBanks(bankOne, bankTwo, bankThree);
    console.log('data sent to reder pages.routes',data);
    //res.json(data);
    res.render("compare", { title: 'Welcome to Chino Loan Website', data });
  } catch (e) {
    next(e);
  }
  //res.render("compare");
});

module.exports = router;
