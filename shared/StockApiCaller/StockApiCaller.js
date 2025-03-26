let AlpacaApiService, YahooFinanceApiService, AlphaVantageApiService;

if (typeof require !== 'undefined') {
    // Node.js (CommonJS)
    AlpacaApiService = require('./AlpacaApiService');
    YahooFinanceApiService = require('./YahooFinanceApiService');
    AlphaVantageApiService = require('./AlphaVantageApiService');
} else {
    // React Native (ESM)
    import('./AlpacaApiService').then((module) => AlpacaApiService = module.default);
    import('./YahooFinanceApiService').then((module) => YahooFinanceApiService = module.default);
    import('./AlphaVantageApiService').then((module) => AlphaVantageApiService = module.default);
}

class StockApiCaller {
    constructor() {
        this.apiService = null;
        this.apiKey = '';
        this.secretKey = '';
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
        return this;
    }

    setSecretKey(secretKey) {
        this.secretKey = secretKey;
        return this;
    }

    setApiService(service) {
        switch (service) {
            case 'alpaca': {
                this.apiService = new AlpacaApiService();
                break;
            }
            case 'yahoofinance': {
                this.apiService = new YahooFinanceApiService();
                break;
            }
            case 'alphavantage': {
                this.apiService = new AlphaVantageApiService();
                break;
            }
        }
        return this;
    }

    async fetchLatestTradePriceOf(symbol) {
        if (!this.apiService) {
            throw new Error('api service is not set');
        }
        return await this.apiService.fetchLatestTradePriceOf(symbol, this.apiKey, this.secretKey);
    }

    async fetchLatestQuotePriceOf(symbol) {
        if (!this.apiService) {
            throw new Error('api service is not set');
        }
        return await this.apiService.fetchLatestQuotePriceOf(symbol, this.apiKey, this.secretKey);
    }
}

module.exports = StockApiCaller;

(async () => {
    const caller = new StockApiCaller().setApiService('alpaca');

    const data = await caller.fetchLatestTradePriceOf('AAPL');
    const data1 = await caller.fetchLatestQuotePriceOf('AAPL');

    console.log(data.trade.exchange);
    console.log(data1.quote.askPrice);
})();