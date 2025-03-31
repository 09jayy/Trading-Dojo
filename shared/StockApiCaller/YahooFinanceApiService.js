let IApiService;
let yahooFinance; 

if (typeof require !== 'undefined') {
    IApiService = require('./IApiService');
    yahooFinance = require('yahoo-finance2').default;
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

    /**
     * 
     * @param {string} symbol - stock symbol 
     * @returns {Promise<StockQuote> | undefined} - stock quote stats as defined by yahoo-finance2 npm package
     */
    async fetchStatsOf(symbol){
        return await yahooFinance.quote(symbol);
    }
}

module.exports = YahooFinanceApiService;

/**
 * @typedef {Object} StockQuote - Stock quote stats as defined by yahoo-finance2 npm package
 * @property {string} language - Language of the data (e.g., 'en-US')
 * @property {string} region - Region/market of the stock (e.g., 'US')
 * @property {string} quoteType - Type of instrument (e.g., 'EQUITY')
 * @property {string} quoteSourceName - Source of the quote (e.g., 'Nasdaq Real Time Price')
 * @property {boolean} triggerable - Whether the stock can be triggered for trading
 * @property {string} currency - Currency of the prices (e.g., 'USD')
 * @property {string} exchange - Exchange code (e.g., 'NMS' for Nasdaq)
 * @property {string} shortName - Short company name (e.g., 'Apple Inc.')
 * @property {string} longName - Full company name (e.g., 'Apple Inc.')
 * @property {string} messageBoardId - ID for company message boards
 * @property {string} exchangeTimezoneName - Exchange timezone (e.g., 'America/New_York')
 * @property {string} exchangeTimezoneShortName - Timezone abbreviation (e.g., 'EST')
 * @property {number} gmtOffSetMilliseconds - GMT offset in milliseconds
 * @property {string} market - Market identifier (e.g., 'us_market')
 * @property {boolean} esgPopulated - Whether ESG data is available
 * @property {number} epsCurrentYear - Earnings per share for current year
 * @property {number} priceEpsCurrentYear - Price-to-EPS ratio for current year
 * @property {number} sharesOutstanding - Total shares outstanding
 * @property {number} bookValue - Book value per share
 * @property {number} fiftyDayAverage - 50-day moving average price
 * @property {number} fiftyDayAverageChange - Change from 50-day average
 * @property {number} fiftyDayAverageChangePercent - Percentage change from 50-day average
 * @property {number} twoHundredDayAverage - 200-day moving average price
 * @property {number} twoHundredDayAverageChange - Change from 200-day average
 * @property {number} twoHundredDayAverageChangePercent - Percentage change from 200-day average
 * @property {number} marketCap - Market capitalization
 * @property {number} forwardPE - Forward price-to-earnings ratio
 * @property {number} priceToBook - Price-to-book ratio
 * @property {number} sourceInterval - Data refresh interval in minutes
 * @property {number} exchangeDataDelayedBy - Data delay in minutes
 * @property {boolean} tradeable - Whether the stock is currently tradeable
 * @property {Date} firstTradeDateMilliseconds - Date of first trade
 * @property {number} priceHint - Decimal places for price display
 * @property {string} marketState - Current market state (e.g., 'PREPRE' for pre-market)
 * @property {number} postMarketChangePercent - Post-market price change percentage
 * @property {Date} postMarketTime - Time of last post-market update
 * @property {number} postMarketPrice - Post-market price
 * @property {number} postMarketChange - Post-market price change
 * @property {number} regularMarketChange - Regular market price change
 * @property {number} regularMarketChangePercent - Regular market price change percentage
 * @property {Date} regularMarketTime - Time of last regular market update
 * @property {number} regularMarketPrice - Current regular market price
 * @property {number} regularMarketDayHigh - Today's high price
 * @property {Object} regularMarketDayRange - Today's price range
 * @property {number} regularMarketDayRange.low - Today's low price
 * @property {number} regularMarketDayRange.high - Today's high price
 * @property {number} regularMarketDayLow - Today's low price
 * @property {number} regularMarketVolume - Today's trading volume
 * @property {number} regularMarketPreviousClose - Previous closing price
 * @property {number} bid - Current bid price
 * @property {number} ask - Current ask price
 * @property {number} bidSize - Size of current bid
 * @property {number} askSize - Size of current ask
 * @property {string} fullExchangeName - Full exchange name (e.g., 'NasdaqGS')
 * @property {string} financialCurrency - Currency for financial reporting
 * @property {number} regularMarketOpen - Today's opening price
 * @property {number} averageDailyVolume3Month - 3-month average daily volume
 * @property {number} averageDailyVolume10Day - 10-day average daily volume
 * @property {number} fiftyTwoWeekLowChange - Change from 52-week low
 * @property {number} fiftyTwoWeekLowChangePercent - Percentage change from 52-week low
 * @property {Object} fiftyTwoWeekRange - 52-week price range
 * @property {number} fiftyTwoWeekRange.low - 52-week low price
 * @property {number} fiftyTwoWeekRange.high - 52-week high price
 * @property {number} fiftyTwoWeekHighChange - Change from 52-week high
 * @property {number} fiftyTwoWeekHighChangePercent - Percentage change from 52-week high
 * @property {number} fiftyTwoWeekLow - 52-week low price
 * @property {number} fiftyTwoWeekHigh - 52-week high price
 * @property {Date} dividendDate - Next dividend payment date
 * @property {Date} earningsTimestamp - Last earnings report timestamp
 * @property {Date} earningsTimestampStart - Next earnings call start time
 * @property {Date} earningsTimestampEnd - Next earnings call end time
 * @property {number} trailingAnnualDividendRate - Annual dividend rate
 * @property {number} trailingPE - Trailing price-to-earnings ratio
 * @property {number} trailingAnnualDividendYield - Annual dividend yield
 * @property {number} epsTrailingTwelveMonths - Trailing 12-month EPS
 * @property {number} epsForward - Forward EPS estimate
 * @property {string} displayName - Display name for the stock
 * @property {string} symbol - Stock symbol (e.g., 'AAPL')
 */