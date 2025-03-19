export interface ApiService {
    fetchLatestTradePriceOf(symbol: string, apiKey: string, secretKey: string) : Promise<number>; 
}