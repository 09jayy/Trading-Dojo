const firebase = require('firebase-admin'); 
const IOrderStrategy = require('./IOrderStrategy.js');  

class MarketOrder extends IOrderStrategy {
    constructor({tradeType, stockSymbol, shareQuantity, userId}){
        this.tradeType = tradeType; 
        this.stockSymbol = stockSymbol;
        this.shareQuantity = shareQuantity; 
        this.userId = userId; 
    }

    async execute() {
        switch (this.tradeType) {
            case 'buy':
                return await this.buy(); 
            case 'sell':
                return await this.sell();
        }
    }

    getTradeType() {
        return this.tradeType; 
    }

    /**
     * Buy stock shares via market order processing 
     * process: 
     * 1. adds shares to account , record amount of money spent buying that amount of shares
     * 2. reduce account bank balance by money spent
     * @param {Object} db - references firebase firestore database 
     * @param {number} sharePrice - current fetched share price of stock to be used in order
     * @returns {void}
     */
    async buy(db,sharePrice) {
        try {
            const costOfShares = sharePrice * this.shareQuantity; 

            const userRef = db.collection('users').doc(this.userId); 

            // 1. adds shares to account , record amount of money spent buying that amount of shares
            const resSharesUpdate = await userRef.update(
                {'ownedShares.stockSymbol': FieldValue.arrayUnion(
                    {
                        shareQuantity: this.shareQuantity,
                        costOfShares: costOfShares,
                        created: firebase.firestore.TimeStamp.now() 
                    })
                }
            )
            
            // 2. reduce account bank balance by money spent
            const resBalanceUpdate = await userRef.update(
                {
                    balance: FieldValue.increment(costOfShares * -1)
                }
            ); 
        } catch (error) {
            throw error;   
        }
    }

    async sell(sharePrice) {
        // 
    }
}

module.exports = MarketOrder;
