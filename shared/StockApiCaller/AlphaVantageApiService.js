let IApiService;

if (typeof require !== 'undefined') {
    IApiService = require('./IApiService');
} else {
    import('./IApiService').then((module) => IApiService = module.default);
}

class AlphaVantageApiService extends IApiService {
    async fetchLatestQuotePriceOf(symbol, apiKey, secretKey) {
        throw new Error('Method not implemented.');
    }

    async fetchLatestTradePriceOf(symbol, apiKey, secretKey) {
        throw new Error('Method not implemented.');
    }
}

module.exports = AlphaVantageApiService;