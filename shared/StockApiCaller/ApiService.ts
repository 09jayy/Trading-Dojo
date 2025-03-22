import { LatestTrade, LatestQuote } from "./apiTypes"; 

export interface ApiService {
    fetchLatestTradePriceOf(symbol: string, method: string, apiKey: string, secretKey: string) : Promise<LatestTrade>; 

    fetchLatestQuotePriceOf(symbol: string, method: string, apiKey: string, secretKey: string) : Promise<LatestQuote>; 
}