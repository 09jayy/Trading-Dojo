const firebase = require('firebase-admin'); 
const { Timestamp, FieldValue } = require('firebase-admin/firestore');
const IOrderStrategy = require('./IOrderStrategy.js');  

class MarketOrder extends IOrderStrategy {
    /**
     * Creates a market order using the provided order details
     * @param {{
    *      tradeType: 'buy'|'sell',  - Type of trade either 'buy' or 'sell'
    *      stockSymbol: string,      - The stock symbol to trade
    *      shareQuantity: number,    - Number of shares to buy/sell
    *      userId: string            - ID of the user placing the order
    * }} orderData - Market order properties
    * @returns {MarketOrder} - new market order object 
    */ 
    constructor({tradeType, stockSymbol, shareQuantity, userId}){
        super(); 
        this.tradeType = tradeType; 
        this.stockSymbol = stockSymbol;
        this.shareQuantity = shareQuantity; 
        this.userId = userId; 
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
     * @param {string} time - time of share price fetched
     * @returns {void}
     */
    async execute(db,sharePrice, time) {
        const costOfShares = sharePrice * this.shareQuantity; 
        try {
            const userRef = db.collection('users').doc(this.userId); 
            await db.runTransaction(async (t) => {
                const userDoc = await t.get(userRef);
                
                // check user is valid
                if (!userDoc.exists) {
                    throw new Error('user doc does not exist'); 
                }

                // check if current balance is enough to buy shares
                const currentBalance = userDoc.data().balance || 0;
                if (this.tradeType === 'buy' && currentBalance < costOfShares) {
                    throw new Error('insufficient funds'); 
                }

                // check if selected share quantity is currently owned by user before selling 
                if (this.tradeType === 'sell') {
                    const stockSymbolTradeReciepts = userDoc.data().ownedShares?.[this.stockSymbol] || []; 
                    const totalSharesOwned = stockSymbolTradeReciepts.reduce(
                        (sum, trade) => sum + (trade.tradeType === 'buy' ? trade.shareQuantity : -trade.shareQuantity),
                        0
                    );
                    
                    if (totalSharesOwned < this.shareQuantity) {
                        throw new Error('trying to sell insufficient share quantity'); 
                    }
                }
                
                // create new reciept for purchase
                const shareOrderReciept = {
                    shareQuantity: this.shareQuantity,
                    sharePrice: sharePrice,
                    tradeType: this.tradeType, 
                    created: time,
                    id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36) 
                }

                // 1. adds shares to account , record amount of money spent buying that amount of shares
                // 2. reduce account bank balance by money spent
                t.update(userRef, {
                    [`ownedShares.${this.stockSymbol}`]: FieldValue.arrayUnion(shareOrderReciept),
                    'balance': FieldValue.increment( (this.tradeType === 'buy') ? costOfShares * -1: costOfShares)
                }) 
            })
            console.log('Transaction successfully commited')
        } catch (error) {
            console.error('Transaction failed: ' + error); 
            throw error; 
        }
    }
}

module.exports = MarketOrder;
