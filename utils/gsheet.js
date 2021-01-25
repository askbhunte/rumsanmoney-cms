const { GoogleSpreadsheet } = require('google-spreadsheet');
const config = require('config');

const credsPath = '../config/googlespreadsheet.json';

class GSheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(config.get('services.gsheet.docId'));
    this.doc.useServiceAccountAuth(require(credsPath));
  }

  async getBank() {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    const data = [];
    rows.map((el) => {
      const objData = {};
      objData.name = el.Bank ? el.Bank : null;
      objData.head_office = el['Head Office'] ? el['Head Office'] : null;
      objData.primary_contact = el['Contact no.'] ? el['Contact no.'] : null;
      objData.email = el.Email ? el.Email : null;
      data.push(objData);
    });
    return data;
  }

  async getProduct() {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[1];
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    const data = [];
    rows.forEach((el) => {
      const objData = {};
      objData.name = el['Product Name'] ? el['Product Name'] : null;
      objData.bank_id = el.Bank ? el.Bank : null;
      objData.image_url = el.image_url ? el.image_url : null;
      objData.plink = el.Url ? el.Url : null;
      objData.ptype = el['Product Type'] ? el['Product Type'] : null;
      objData.loan_type = el['Deposit/Loan'] ? el['Deposit/Loan'].toLowerCase() : null;
      objData.base_rate = el['Base Rate'] ? Number(el['Base Rate']) : 0;
      objData.interest_rate = el['Interest Rate'] ? Number(el['Interest Rate']) : 0;
      objData.description = el.Description ? el.Description : '';
      data.push(objData);
    });
    return data;
  }

  async getCategory() {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[2];
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    const data = [];
    rows.forEach((el) => {
      const objData = {};
      objData.name = el['Account type'] ? el['Account type'] : ' ';
      objData.icon = el.icons ? el.icons : ' ';
      data.push(objData);
    });
    return data;
  }
}

module.exports = new GSheet();
