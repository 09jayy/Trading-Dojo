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
        this.apiKey = null;
        this.secretKey = null;
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

    async fetchLatestTradeOf(symbol) {
        if (!this.apiService) {
            throw new Error('api service is not set');
        }

        if (!this.apiKey || !this.secretKey) {
            throw new Error('api key or secret key is null');
        }

        return await this.apiService.fetchLatestTradeOf(symbol, this.apiKey, this.secretKey);
    }

    async fetchLatestQuoteOf(symbol) {
        if (!this.apiService) {
            throw new Error('api service is not set');
        }

        if (!this.apiKey || !this.secretKey) {
            throw new Error('api key or secret key is null');
        }

        return await this.apiService.fetchLatestQuoteOf(symbol, this.apiKey, this.secretKey);
    }

    /**
     * 
     * @param {string} symbol - stock symbol 
     * @returns {Promise<any> | undefined} - stock stats
     */
    async fetchStatsOf(symbol){
        if (!this.apiService) {
            throw new Error('api service is not set');
        }

        return await this.apiService.fetchStatsOf(symbol);
    }
}

module.exports = StockApiCaller;