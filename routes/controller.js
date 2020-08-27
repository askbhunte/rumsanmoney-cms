const GSheet = require('../services/gsheet');

class Controller {
    async getAllData(bankName,productType) {
        let data = await GSheet.getData();
        console.log('hi');
        console.log(data);
        console.log('hi');
        console.log(bankName,productType);
        if(bankName){
            data = data.filter(el => {
                return el.bank_name == bankName;
            }); 
            console.log(data);
        }
        if(productType){
            data = data.filter(el => {
                return el.product_type == productType;
            }); 
            console.log(data);
        }            
                 
       // console.log(data);
        return data;
    }

    async getLookup() {
        let data = await GSheet.getLookup();
        return data;
    }
}
module.exports = new Controller();
