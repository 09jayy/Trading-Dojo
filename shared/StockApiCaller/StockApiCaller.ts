import {ApiService} from './ApiService'; 
import {AlpacaApiService} from './AlpacaApiService'; 
import {YahooFinanceApiService} from './YahooFinanceApiService';
import { AlphaVantageApiService } from './AlphaVantageApiService';

export class StockApiCallBuilder{
    apiService: ApiService | null; 
    apiKey: string | null;
    secretKey: string | null;  

    constructor(){
        this.apiService = null; 
        this.apiKey = null; 
        this.secretKey = null; 
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

    setApiKey(key: string) : void {
        this.apiKey = key; 
    }

    setSecretKey(key: string) : void {
        this.secretKey = key; 
    }
}

console.log('Api Call Stock Builder Class')