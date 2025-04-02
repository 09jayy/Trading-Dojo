const express = require('express')
const cron = require('node-cron'); 
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json'); 
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const StockApiCaller = require('stockapicaller'); 
require('dotenv').config(); 

// initialise express app server
const app = express()
const port = 3000
app.use(express.json()); 

const alpacaApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey(process.env.ALPACA_API_KEY)
    .setSecretKey(process.env.ALPACA_SECRET_KEY);

const orderProcessing = process.argv.includes('enable-order-processing'); 
if (orderProcessing) {
    console.log('order processing is enabled') 
} else {
    console.log('order processing is disabled')
}

// initialise firebase admin app with service account key
initializeApp({
    credential: cert(serviceAccount)
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

/** endpoint for adding order to database */
app.post('/order', async (req, res) => {
    try {
        console.log("Incoming request:", req.body); 

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid request: No order data received" });
        }

        const docRef = db.collection('Orders').doc();
        await docRef.set(req.body);

        res.status(201).json({ message: "Order added successfully", orderId: docRef.id });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/* STOCK ORDER EXEUCTION */
cron.schedule('*/5 * * * * *', async () => {
    if (!orderProcessing) {
        console.log('order processing is disabled, to enable use "enable-order-processing" command line flag when running index.js'); 
        return; 
    }
    
    console.log('attempting to execute limit stock orders'); 

    const ordersRef = db.collection('Orders')
    const limitOrderList = await ordersRef.where('limit', '!=', null).get();
    
    if (limitOrderList.empty) {
        console.log('no limit orders to execute'); 
        return; 
    } else {
        console.log('stock orders found')
    }

    limitOrderList.forEach(limitOrder => {
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