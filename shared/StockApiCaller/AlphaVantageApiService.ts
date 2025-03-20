import {ApiService} from './ApiService'; 
import { LatestQuote, LatestTrade } from './apiTypes';

export class AlphaVantageApiService implements ApiService {
    fetchLatestQuotePriceOf(symbol: string, apiKey: string, secretKey: string): Promise<LatestQuote> {
        throw new Error('Method not implemented.');
    }
    fetchLatestTradePriceOf(symbol: string, apiKey: string, secretKey: string): Promise<LatestTrade> {
        throw new Error('Method not implemented.');
    }
}