class IApiService {
    fetchLatestTradeOf(symbol, apiKey, secretKey) {}

    fetchLatestQuoteOf(symbol, apiKey, secretKey) {}

    fetchStatsOf(symbol){}
}

module.exports = IApiService;