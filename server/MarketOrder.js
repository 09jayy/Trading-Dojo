const firebase = require('firebase-admin'); 
const { Timestamp, FieldValue } = require('firebase-admin/firestore');
const IOrderStrategy = require('./IOrderStrategy.js');  

class MarketOrder extends IOrderStrategy {
    constructor({tradeType, stockSymbol, shareQuantity, userId}){
        super(); 
        this.tradeType = tradeType; 
        this.stockSymbol = stockSymbol;
        this.shareQuantity = shareQuantity; 
        this.userId = userId; 
    }

    async execute(db, sharePrice) {
        switch (this.tradeType) {
            case 'buy':
                return await this.buy(db, sharePrice); 
            case 'sell':
                return await this.sell(db, sharePrice);
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
        const costOfShares = sharePrice * this.shareQuantity; 
        try {
            const userRef = db.collection('users').doc(this.userId); 
            await db.runTransaction(async (t) => {
                const userDoc = await t.get(userRef);
                
                // check user is valid
                if (!userDoc.exists) {
                    throw new Error('user doc does not exist'); 
                }

                // check if current balance is enough
                const currentBalance = userDoc.data().balance || 0;
                if (currentBalance < costOfShares) {
                    throw new Error('insufficient funds'); 
                }
                
                // create new reciept for purchase
                const sharePurchaseReciept = {
                    shareQuantity: this.shareQuantity,
                    costOfShares: costOfShares,
                    created: Timestamp.now()
                }

                // 1. adds shares to account , record amount of money spent buying that amount of shares
                // 2. reduce account bank balance by money spent
                t.update(userRef, {
                    [`ownedShares.${this.stockSymbol}`]: FieldValue.arrayUnion(sharePurchaseReciept),
                    'balance': FieldValue.increment(costOfShares * -1)
                }) 
            })
            console.log('Transaction successfully commited')
        } catch (error) {
            console.error('Transaction failed: ' + error); 
            throw error; 
        }
    }

    async sell(sharePrice) {
        // 
    }
}

module.exports = MarketOrder;
