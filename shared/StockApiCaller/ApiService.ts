import { LatestTrade, LatestQuote } from "./apiTypes"; 

export interface ApiService {
    fetchLatestTradePriceOf(symbol: string) : Promise<LatestTrade>; 

    fetchLatestQuotePriceOf(symbol: string) : Promise<LatestQuote>; 
}