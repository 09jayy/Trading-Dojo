const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json'); 
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const StockApiCaller = require('stockapicaller'); 

// initialise express app server
const app = express()
const port = 3000
app.use(express.json()); 

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