import { 
    LatestTrade, 
    LatestQuote } from './apiTypes';
import {ApiService} from './ApiService'; 
import Alpaca from '@alpacahq/alpaca-trade-api'; 

export class AlpacaApiService implements ApiService {
    private alpaca: Alpaca;

    constructor(apiKey: string, secretKey: string) {
        this.alpaca = new Alpaca({
            keyId: apiKey,
            secretKey: secretKey,
            paper: true
        });  
    }
    
    async fetchLatestTradePriceOf(symbol: string): Promise<LatestTrade> {
        return await this.alpaca.getLatestTrade(symbol) as unknown as Promise<LatestTrade>; 
    }

    async fetchLatestQuotePriceOf(symbol: string): Promise<LatestQuote> {
        return await this.alpaca.getLatestQuote(symbol) as unknown as Promise<LatestQuote>; 
    }
}
