let IApiService;

if (typeof require !== 'undefined') {
    IApiService = require('./IApiService');
} else {
    import('./IApiService').then((module) => IApiService = module.default);
}
class AlpacaApiService extends IApiService {
    async fetchLatestTradePriceOf(symbol, apiKey, secretKey) {
        const url = `https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'APCA-API-KEY-ID': apiKey,
                    'APCA-API-SECRET-KEY': secretKey
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorBody}`);
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            throw error;
        }
    }

    async fetchLatestQuotePriceOf(symbol, apiKey, secretKey) {
        const url = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'APCA-API-KEY-ID': apiKey,
                    'APCA-API-SECRET-KEY': secretKey
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorBody}`);
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AlpacaApiService;