const GSheet = require('../services/gsheet');

class Controller {
  async getAllData(bankName, productType, productName) {
    try {
      let data = await GSheet.getData();
      if (bankName) {
        data = data.filter((el) => el.bank_name === bankName);
      }
      if (productType) {
        data = data.filter((el) => el.product_type === productType);
      }
      if (productName) {
        data = data.filter((el) => el.product_name === productName);
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

  async getAllLoanType(type) {
    try {
      console.log('inside getAllLoanType');
      const data = await GSheet.getLookup();
      let finalData = [];
      let objData = {};
      if(type){
        data = data.filter((el) => {
          el.account_type === type;
        });
        data.forEach((el) => {
          objData['account_type'] = el.account_type;
          finalData.push(objData);
        });
      }
      else{
        data.forEach((el)=> {
          objData['account_type'] = el.account_type;
          finalData.push(objData);
        });
      }
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
      console.log('compare banks controller', data);
      return data;
    } catch (error) {
      return { msg: error };
    }
  }
}
module.exports = new Controller();
