import {ApiService} from './ApiService'; 
import {AlpacaApiService} from './AlpacaApiService'; 
import {YahooFinanceApiService} from './YahooFinanceApiService';
import { AlphaVantageApiService } from './AlphaVantageApiService';
import * as dotenv from 'dotenv'; 

dotenv.config(); 

export class StockApiCallBuilder{
    apiService: ApiService | null; 
    private apiKey: string; 
    private secretKey: string; 

    constructor(){
        if (process.env.API_KEY === undefined) {
            throw new Error('API_KEY is undefined, set environment variable in .env file'); 
        }
        if (process.env.SECRET_KEY === undefined) {
            throw new Error('SECRET KEY is undefined, set environment variable in .env file'); s
        }

        this.apiService = null; 
        this.apiKey = process.env.API_KEY; 
        this.secretKey = process.env.SECRET_KEY; 
    }

    setApiService(service: 'alpaca' | 'yahoofinance' | 'alphavantage') : void {
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
    }

    fetchCurrentStockPriceOf(symbol: string): number {
        if (!this.apiService) { throw new Error('api service is not set'); }
    
        return this.apiService.fetchCurrentStockPriceOf(symbol, this.apiKey, this.secretKey); 
    }
}

console.log('Api Call Stock Builder Class')