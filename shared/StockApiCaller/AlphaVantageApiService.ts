import {ApiService} from './ApiService'; 

export class AlphaVantageApiService implements ApiService {
    fetchLatestTradePriceOf(symbol: string, apiKey: string, secretKey: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
}