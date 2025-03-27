let IApiService;
let yahooFinance; 

if (typeof require !== 'undefined') {
    IApiService = require('./IApiService');
    yahooFinance = require('yahoo-finance2');
} else {
    import('./IApiService').then((module) => IApiService = module.default);
    import('yahoo-finance2').then((module) => yahooFinance = module.default);
}

class YahooFinanceApiService extends IApiService{
    async fetchLatestQuoteOf(symbol, apiKey, secretKey) {
        throw new Error('Method not implemented.');
    }

    async fetchLatestTradeOf(symbol, apiKey, secretKey) {
        throw new Error('Method not implemented.');
    }
}

module.exports = YahooFinanceApiService;