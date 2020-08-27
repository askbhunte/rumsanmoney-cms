const GSheet = require('../services/gsheet');

class Controller {
  async getAllData(bankName, productType) {
    try {
      let data = await GSheet.getData();
      if (bankName) {
        data = data.filter((el) => el.bank_name === bankName);
      }
      if (productType) {
        data = data.filter((el) => el.product_type === productType);
      }
      return data;
    } catch (error) {
      return { msg: error };
    }
  }

  async getLookup() {
    try {
      const data = await GSheet.getLookup();
      return data;
    } catch (error) {
      return { msg: error };
    }
  }
}
module.exports = new Controller();
