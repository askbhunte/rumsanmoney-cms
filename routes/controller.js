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

  async compareBanks(bankOne, bankTwo, bankThree) {
    try {
      const allData = await this.getAllData();
      const data = [];
      if (bankOne) {
        const bankOneDetails = allData.filter((el) => el.bank_id === bankOne);
        data.push(bankOneDetails[0]);
      }
      if (bankTwo) {
        const bankTwoDetails = allData.filter((el) => el.bank_id === bankTwo);
        data.push(bankTwoDetails[0]);
      }
      if (bankThree) {
        const bankThreeDetails = allData.filter((el) => el.bank_id === bankThree);
        data.push(bankThreeDetails[0]);
      }
      return data;
    } catch (error) {
      return { msg: error };
    }
  }
}
module.exports = new Controller();
