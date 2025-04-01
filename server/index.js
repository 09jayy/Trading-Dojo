const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json'); 
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const StockApiCaller = require('stockapicaller'); 

// initialise express app server
const app = express()
const port = 3000

// initialise firebase admin app with service account key
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const stockApiCaller = new StockApiCaller().setApiService('yahoofinance');
    const stats = await stockApiCaller.fetchStatsOf(symbol);
    res.send(stats);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})