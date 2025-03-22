import {ApiService} from './ApiService'; 
import {AlpacaApiService} from './AlpacaApiService'; 
import {YahooFinanceApiService} from './YahooFinanceApiService';
import { AlphaVantageApiService } from './AlphaVantageApiService';
import * as dotenv from 'dotenv'; 
import { LatestTrade, LatestQuote } from './apiTypes';

dotenv.config(); 

export class StockApiCaller{
    apiService: ApiService | null; 
    private apiKey: string; 
    private secretKey: string; 

    constructor(){
        if (process.env.API_KEY === undefined) {
            throw new Error('API_KEY is undefined, set environment variable in .env file'); 
        }
        if (process.env.SECRET_KEY === undefined) {
            throw new Error('SECRET KEY is undefined, set environment variable in .env file');
        }

        this.apiService = null; 
        this.apiKey = process.env.API_KEY; 
        this.secretKey = process.env.SECRET_KEY; 
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
    
        return await this.apiService.fetchLatestTradePriceOf(symbol,'GET', this.apiKey, this.secretKey); 
    }

    async fetchLatestQuotePriceOf(symbol: string): Promise<LatestQuote> {
        if (!this.apiService) { throw new Error('api service is not set'); }
    
        return await this.apiService.fetchLatestQuotePriceOf(symbol,'GET', this.apiKey, this.secretKey); 
    }
}

(async () => {
    const caller = new StockApiCaller().setApiService('alpaca'); 

    const data = await caller.fetchLatestTradePriceOf('AAPL');
    const data1 = await caller.fetchLatestQuotePriceOf('AAPL'); 

    console.log(data.Price);
    console.log(data1.BidPrice); 
})();