const express = require('express')
const cron = require('node-cron'); 
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const StockApiCaller = require('@09jayy/stockapicaller'); 
const MarketOrder = require('./MarketOrder'); 
require('dotenv').config(); 

// initialise express app server
const app = express()
const port = process.env.PORT || 3000; 
app.use(express.json()); 

const alpacaApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey(process.env.ALPACA_API_KEY)
    .setSecretKey(process.env.ALPACA_SECRET_KEY);

// Limit Order Processing command line flag
const limitOrderProcessing = process.argv.includes('--process-limit-orders'); 
console.log('limit order processing is ' +  ( (limitOrderProcessing) ? 'enabled' : 'disabled') ); 
if (!limitOrderProcessing) { console.log('order processing is disabled to reduce daily firebase read and writes, \nto enable use "--process-limit-orders" command line flag when running index.js'); }

// initialise firebase admin app with service account key
initializeApp({
    credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT))
});
const db = getFirestore();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/** endpoint for retrieving market data */
app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const stockApiCaller = new StockApiCaller().setApiService('yahoofinance');
    const stats = await stockApiCaller.fetchStatsOf(symbol);
    res.send(stats);
})

/** 
 * endpoint for adding order to database 
 * @param {Request} req - request sent in via post
 * @property {Object} req.body - Request body
 * @property {string} req.body.stockSymbol - Symbol of the stock to purchase
 * @property {number} req.body.shareQuantity - Number of shares to purchase
 * @property {string} req.body.userId - ID of the user making the purchase
*/
app.post('/order', async (req, res) => {
    try {
        console.log("Incoming request:", req.body); 

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid request: No order data received" });
        }

        const latestTrade = await alpacaApiCaller.fetchLatestTradeOf(req.body.stockSymbol); 
        console.log('TRADING AT PRICE', latestTrade); 
        const sharePrice = latestTrade.trade.p; 
        const time = latestTrade.trade.t; 
        console.log('current price: ', sharePrice); 

        if (!req.body.limit) {
            const order = new MarketOrder(req.body); 
            try {
                await order.execute(db,sharePrice, time);
                console.log('stock order completed');  
            } catch (error) {
                console.error(error); 
                res.status(400).json({message:`stock order failed: ${error.message}`}); 
                return; 
            }
        }
        res.status(201).json({...req.body, sharePrice: sharePrice}); 
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

/* STOCK ORDER EXEUCTION */
cron.schedule('*/5 * * * * *', async () => {
    if (!limitOrderProcessing) { return; }    
    console.log('attempting to execute limit stock orders'); 

    const ordersRef = db.collection('Orders')
    const limitOrderList = await ordersRef.where('limit', '!=', null).get();
    
    if (limitOrderList.empty) {
        console.log('no limit orders to execute'); 
        return; 
    } else {
        console.log('stock orders found')
    }

    console.log(limitOrderList.length); 

    limitOrderList.forEach(limitOrder => {
        console.log(limitOrder); 
        const stockPrice = alpacaApiCaller.fetchLatestTradeOf(limitOrder._fieldsProto.stockSymbol.stringValue);
        const tradeType = limitOrder._fieldsProto.tradeType.stringValue; 
        if ( (tradeType == 'sell' && stockPrice <= limit) || (tradeType='buy' && stockPrice >= limit)) {
            console.log('limit order to be executed')
            executeLimitTrade(limitOrder); 
        } else {
            console.log('limit order not ready to be executed'); 
        }
    })
})

app.listen(port, () => {
    console.log(`Order Server App listening on port ${port}`)
})