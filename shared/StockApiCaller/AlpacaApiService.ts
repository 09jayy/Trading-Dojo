import { StockData } from './apiTypes';
import {ApiService} from './ApiService'; 
import Alpaca from '@alpacahq/alpaca-trade-api'; 

export class AlpacaApiService implements ApiService {
    async fetchLatestTradePriceOf(symbol: string,  apiKey: string, secretKey: string): Promise<number> {
        const url: string = `https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`;

        try {
            const response = await fetch(url, {
                method: 'GET',
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

            const data: StockData = await response.json();
            return data.trade.p;
        } catch(error) {
            throw error;  
        }
    }
}
