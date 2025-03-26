import { LatestTrade, LatestQuote } from "./apiTypes"; 

export interface ApiService {
    fetchLatestTradePriceOf(symbol: string, apiKey: string, secretKey: string) : Promise<LatestTrade>; 

    fetchLatestQuotePriceOf(symbol: string, apiKey: string, secretKey: string) : Promise<LatestQuote>; 
}