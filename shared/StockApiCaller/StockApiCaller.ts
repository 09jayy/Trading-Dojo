import {ApiService} from './ApiService'; 
import {AlpacaApiService} from './AlpacaApiService'; 
import {YahooFinanceApiService} from './YahooFinanceApiService';
import { AlphaVantageApiService } from './AlphaVantageApiService';
import { LatestTrade, LatestQuote } from './apiTypes';

export default class StockApiCaller{
    apiService: ApiService | null; 
    private apiKey: string; 
    private secretKey: string; 

    constructor(){
        this.apiService = null; 
        this.apiKey = ''; 
        this.secretKey = ''; 
    }

    setApiKey(apiKey: string): StockApiCaller{
        this.apiKey = apiKey;
        return this;
    }

    setSecretKey(secretKey: string): StockApiCaller{
        this.secretKey = secretKey;
        return this;
    }

    setApiService(service: 'alpaca' | 'yahoofinance' | 'alphavantage') : StockApiCaller{
        switch(service) {
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

    async fetchLatestTradePriceOf(symbol: string): Promise<LatestTrade> {
        if (!this.apiService) { throw new Error('api service is not set'); }
    
        return await this.apiService.fetchLatestTradePriceOf(symbol, this.apiKey, this.secretKey); 
    }

    async fetchLatestQuotePriceOf(symbol: string): Promise<LatestQuote> {
        if (!this.apiService) { throw new Error('api service is not set'); }
    
        return await this.apiService.fetchLatestQuotePriceOf(symbol, this.apiKey, this.secretKey); 
    }
}

(async () => {
    const caller = new StockApiCaller().setApiService('alpaca'); 

    const data = await caller.fetchLatestTradePriceOf('AAPL');
    const data1 = await caller.fetchLatestQuotePriceOf('AAPL'); 

    console.log(data.trade.exchange);
    console.log(data1.quote.askPrice); 
})();