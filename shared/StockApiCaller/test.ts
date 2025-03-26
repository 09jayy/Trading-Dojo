import StockApiCaller from "./StockApiCaller";

(async () => {
    const caller = new StockApiCaller()
        .setApiService('alpaca')
        .setApiKey('PK495ZCSDA4CSGM5FTCR')
        .setSecretKey('eBHtRkGf0FuzFN8Suw8913Ec1iSMfzrTJ9lThUux'); 

    const data = await caller.fetchLatestTradePriceOf('AAPL');
    const data1 = await caller.fetchLatestQuotePriceOf('AAPL'); 

    console.log(data.trade.exchange);
    console.log(data1.quote.askExchange); 
})();