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

    isBusinessDay(date) {
        let day = date.getDay(); 
        return (day == 0 || day == 6) ? false : true;
    }

    /**
     * Fetches the previous day's bar data for a list of stock symbols.
     * @param {string[]} symbols - The stock symbols to fetch data for.
     * @param {string} apiKey - The API key used for authentication.
     * @param {string} secretKey - The secret key used for authentication.
     * @returns {Promise<{
     *      [symbol: string]: Array<{
    *          c: number, // Close price
    *          h: number, // High price
    *          l: number, // Low price
    *          n: number, // Number of trades
    *          o: number, // Open price
    *          t: string, // Timestamp of the bar (ISO 8601 format)
    *          v: number, // Volume of the stock
    *          vw: number  // Volume-weighted average price
    *      }>
    * }>} - An object containing stock symbols as keys, and their respective bar data as values.
    * @throws {Error} - If the request fails or encounters an error.
    */
    async fetchPreviousBarData(symbols, apiKey, secretKey) {
        let date = new Date(); 
        const bars = {}
        while (!this.isBusinessDay(date)) {
            date.setDate(date.getDate() -1); 
        }
        const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbols.join()}&timeframe=1Day&start=${date.toISOString().split('T')[0]}`; 

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

    async fetchBarDataTimeFrame(symbol, timeframe, apiKey, secretKey, {start = null, end = null, limit=null} = {}) {
        let url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=${timeframe}`
        if (start) { url = url + `&start=${start}`}; 
        if (end) { url = url + `&end=${end}`}; 
        if (limit) {url = url + `&limit${limit}`}; 

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers:  {
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