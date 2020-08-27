const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("config");

const credsPath = "../config/googlespreadsheet.json";

class GSheet {
  constructor() { } 
  async getData() {
    const doc = new GoogleSpreadsheet("1ZKT3ZcdA8z4beFWJ87huHhPxbaCQZwMjm12cSc-efCw");
    await doc.useServiceAccountAuth(require(credsPath));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    //const header = sheet.headerValues;
    let rows = await sheet.getRows();
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      let objData = {};     
        objData["bank_name"] = rows[i].Bank;
        objData["product_name"] = rows[i]["Product Name"];
        objData["product_type"] = rows[i]["Product Type"];
        objData["deposit_loan"] = rows[i]["Deposit/Loan"];
        objData["base-rate"] = rows[i]["Base Rate"];
        objData["interest_rate"] = rows[i]["Interest Rate"];
        objData["total_interest_rate"] = rows[i]["Total Interest Rate"];
        objData["minimum_balance"] = rows[i]["Minimum Balance"];
        objData["conditions"] = rows[i].Conditions;
        objData["Url"] = rows[i].Url;
        data.push(objData);
    }
    return data;
  }

  async getLookup(){
    const doc = new GoogleSpreadsheet("1ZKT3ZcdA8z4beFWJ87huHhPxbaCQZwMjm12cSc-efCw");
    await doc.useServiceAccountAuth(require(credsPath));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    await sheet.loadHeaderRow();
    //const header = sheet.headerValues;
    let rows = await sheet.getRows();
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      let objData = {};     
        objData["bank_name"] = rows[i]["Bank Names"];
        objData["account_type"] = rows[i]["Account type"];
        data.push(objData);
  }
  return data;
}
}

module.exports = new GSheet();