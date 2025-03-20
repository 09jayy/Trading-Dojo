import {ApiService} from './ApiService'; 
import { LatestQuote, LatestTrade } from './apiTypes';

export class YahooFinanceApiService implements ApiService {
    fetchLatestQuotePriceOf(symbol: string,): Promise<LatestQuote> {
            throw new Error('Method not implemented.');
    }
    
    fetchLatestTradePriceOf(symbol: string): Promise<LatestTrade> {
        throw new Error('Method not implemented.');
    }
}