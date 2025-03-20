export interface AlpacaLatestTrade {
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

export interface LatestTrade {
    symbol: string,
    trade: {
        timestamp: string,
        exchange: string,
        tradePrice: number,
        tradeSize: number,
        tradeConditions: [string],
        tradeId: number,
        tape: string
    }
}

export interface AlpacaLatestQuote {
    symbol: string,
    quote: {
        t: string,
        ax: string,
        ap: number
        as: number,
        bx: string,
        bp: number,
        bs: number,
        c: [string]
    }
}

export interface LatestQuote {
    symbol: string,
    quote: {
        timestamp: string,
        askExchange: string,
        askPrice: number,
        askSize: number,
        bidExchange: string,
        bidPrice: number,
        bidSize: number,
        quoteConditions: [string]
    }
}