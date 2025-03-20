import { 
    AlpacaLatestTrade,
    AlpacaLatestQuote, 
    LatestTrade, 
    LatestQuote } from './apiTypes';
import {ApiService} from './ApiService'; 
import Alpaca from '@alpacahq/alpaca-trade-api'; 

export class AlpacaApiService implements ApiService {
    private requestBody(method: 'GET' | 'POST', apiKey: string, secretKey: string): Record<string,any> {
        return {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'APCA-API-KEY-ID': apiKey,
                'APCA-API-SECRET-KEY': secretKey
            }
        }
    }
    
    async fetchLatestTradePriceOf(symbol: string,  apiKey: string, secretKey: string): Promise<LatestTrade> {
        const url: string = `https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`;

        try {
            const response = await fetch(url, this.requestBody('GET', apiKey, secretKey)); 

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorBody}`);
            }

            const data: AlpacaLatestTrade = await response.json();
            return {
                symbol: data.symbol,
                trade: {
                    timestamp: data.trade.t,
                    exchange: data.trade.x,
                    tradePrice: data.trade.p,
                    tradeSize: data.trade.s,
                    tradeConditions: data.trade.c,
                    tradeId: data.trade.i,
                    tape: data.trade.z
                }
            }; 
        } catch(error) {
            throw error;  
        }
    }

    async fetchLatestQuotePriceOf(symbol: string, apiKey: string, secretKey: string): Promise<LatestQuote> {
        const url: string = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`;

        try {
            const response = await fetch(url, this.requestBody('GET', apiKey, secretKey)); 

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorBody}`);
            }

            const data: AlpacaLatestQuote = await response.json();
            return {
                symbol: data.symbol,
                quote: {
                    timestamp: data.quote.t,
                    askExchange: data.quote.ax,
                    askPrice: data.quote.ap,
                    askSize: data.quote.as,
                    bidExchange: data.quote.bx,
                    bidPrice: data.quote.bp,
                    bidSize: data.quote.bs,
                    quoteConditions: data.quote.c
                }
            }; 
        } catch(error) {
            throw error;  
        }
    }
}
