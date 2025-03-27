let IApiService;

if (typeof require !== 'undefined') {
    IApiService = require('./IApiService');
} else {
    import('./IApiService').then((module) => IApiService = module.default);
}

/**
 * Alpaca API service
 * @extends IApiService
 */
class AlpacaApiService extends IApiService {
    /**
     * Fetches the latest trade of a stock symbol
     * @param {string} symbol - The stock symbol
     * @param {string} apiKey - The API key
     * @param {string} secretKey - The secret key
     * @returns {Promise<{
     *      symbol: string, 
     *      trade: {
     *          symbol: string, 
     *          t: string,
     *          x: number, 
     *          p: number, 
     *          s: number, 
     *          c: string[], 
     *          i: number, 
     *          z: number
     *      }
     * }>} - The latest trade data {trade: {t - timestamp of trade, x - exchange, p - trade price, s - trade size, c - trade conditions, i - trade ID, z - tape}}
     * }
     * @throws {Error} - If the request fails
     */
    async fetchLatestTradeOf(symbol, apiKey, secretKey) {
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

    /**
     * Fetches the latest quote of a stock symbol
     * @param {string} symbol - The stock symbol
     * @param {string} apiKey - The API key
     * @param {string} secretKey - The secret key
     * @returns {Promise<{
    *      symbol: string,
    *      quote: {
    *          t: string,
    *          ax: string,
    *          ap: number,
    *          as: number,
    *          bx: string,
    *          bp: number,
    *          bs: number,
    *          c: string[]
    *      }
    * }>} - The latest quote data {quote: {t - timestamp of quote, ax - ask exchange, ap - ask price, as - ask size, bx - bid exchange, bp - bid price, bs - bid size, c - quote conditions}}
    * @throws {Error} - If the request fails
    */
    async fetchLatestQuoteOf(symbol, apiKey, secretKey) {
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