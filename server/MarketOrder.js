const IOrderStrategy = require('./IOrderStrategy.js')

class MarketOrder extends IOrderStrategy {
    constructor({tradeType, stockSymbol, shareQuantity, userId}){
        this.tradeType = tradeType; 
        this.stockSymbol = stockSymbol;
        this.shareQuantity = shareQuantity; 
        this.userId = userId; 
    }

    execute() {
        switch (this.tradeType) {
            case 'buy':
                this.buy(); 
                break;
            case 'sell':
                this.sell();
                break; 
        }
    }

    getTradeType() {
        return this.tradeType; 
    }

    buy() {
        
    }

    sell() {

    }
}

module.exports = MarketOrder;
