import {ApiService} from './ApiService'; 
import {AlpacaApiService} from './AlpacaApiService'; 
import {YahooFinanceApiService} from './YahooFinanceApiService';
import { AlphaVantageApiService } from './AlphaVantageApiService';

export class StockApiCallBuilder{
    apiService: ApiService | null; 
    apiKey: string | null;
    secretKey: string | null;  
    baseUri: string | null; 
    params: Record<string,any> | null; 

    constructor(){
        this.apiService = null; 
        this.apiKey = null; 
        this.secretKey = null; 
        this.baseUri = null; 
        this.params = null; 
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

    setBaseUri(uri: string) : void {
        this.baseUri = uri; 
    }

    setParams(params: Record<string, any>) : void {
        this.params = params; 
    }
}

console.log('Api Call Stock Builder Class')