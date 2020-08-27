const GSheet = require('../services/gsheet');

class Controller {
    async getAllData(bankName, productType) {
        try{
            let data = await GSheet.getData();
        if(bankName){
            data = data.filter(el => {
                return el.bank_name == bankName;
            }); 
            
        }
        if(productType){
            data = data.filter(el => {
                return el.product_type == productType;
            }); 
           
        }
        return data;
        }
        catch (error) {
            return {};
        }
    }

    async getLookup() {
        try {
            let data = await GSheet.getLookup();
            return data;
        } catch (error) {
            return {};
        }
    }
}
module.exports = new Controller();
