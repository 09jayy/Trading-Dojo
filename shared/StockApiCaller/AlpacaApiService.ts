import { 
    LatestTrade, 
    LatestQuote,
    AlpacaLatestTrade,
    AlpacaLatestQuote } from './apiTypes';
import {ApiService} from './ApiService'; 

export class AlpacaApiService implements ApiService {
    async fetchLatestTradePriceOf(symbol: string, method: string, apiKey: string, secretKey: string): Promise<LatestTrade> {
        const url: string = `https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`;

        try {
            const response = await fetch(url, {
                method: method, 
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

            const data: AlpacaLatestTrade = await response.json();
            return {
                Symbol: data.symbol,
                Timestamp: data.trade.t,
                Exchange: data.trade.x,
                Price: data.trade.p,
                Size: data.trade.s,
                Conditions: data.trade.c,
                ID: data.trade.i,
                Tape: data.trade.z
            }; 
        } catch(error) {
            throw error;  
        }
    }

    async fetchLatestQuotePriceOf(symbol: string, method: string, apiKey: string, secretKey: string): Promise<LatestQuote> {
        const url: string = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`;

        try {
            const response = await fetch(url, {
                method: method,
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

            const data: AlpacaLatestQuote = await response.json();
            return {
                Symbol: data.symbol,
                Timestamp: data.quote.t,
                AskExchange: data.quote.ax,
                AskPrice: data.quote.ap,
                AskSize: data.quote.as,
                BidExchange: data.quote.bx,
                BidPrice: data.quote.bp,
                BidSize: data.quote.bs,
                Conditions: data.quote.c
            }; 
        } catch(error) {
            throw error;  
        }
    }
}
