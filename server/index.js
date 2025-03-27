const express = require('express')
const StockApiCaller = require('stockapicaller'); 
const app = express()
const port = 3000

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