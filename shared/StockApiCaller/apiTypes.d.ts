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
    Symbol: string, 
    Timestamp: string,
    Exchange: string,
    Price: number,
    Size: number,
    Conditions: [string],
    ID: number,
    Tape: string
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
    Symbol: string;
    BidExchange: string;
    BidPrice: number;
    BidSize: number;
    AskExchange: string;
    AskPrice: number;
    AskSize: number;
    Timestamp: string;
    Conditions: Array<string>;
    Tape: string;
}