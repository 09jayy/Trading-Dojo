export interface StockData {
    symbol: string,
    trade: {
        t: string,
        x: string, 
        p: number,
        s: number, 
        c: [string],
        i: number,
        z: string
    }
}