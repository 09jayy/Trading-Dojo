# Stock Api Caller

Provides interface to make api calls easily switching between different api services

# Methods

## `.setApiService(service: 'alpaca' | 'yahoofinance')`

## `.setApiKey(apiKey: string)`

## `.setSecretKey(secretKey: string)`

## `.fetchLatestTradeOf(symbol: string)`

If apiService is set to `'alpaca'`, returns
```javascript
Promise<{
    symbol: string, 
        trade: { 
        t: string,   // trade time stamp
        x: number,   // exchange price
        p: number,   // trade price
        s: number,   // trade size
        c: string[], // trade conditions
        i: number,   // tradeId
        z: number    // tape
        }
    }
>
```
see Alpaca api docs for more. 

## `.fetchLatestQuoteOf(symbol: string)`

## `.fetchPreviousBarData(symbols: Array<string>)`

If apiService is set to `'alpaca'`, returns
```javascript
{Promise<{
    [symbol: string]: Array<{
        c: number, // Close price
        h: number, // High price
        l: number, // Low price
        n: number, // Number of trades
        o: number, // Open price
        t: string, // Timestamp of the bar (ISO 8601 format)
        v: number, // Volume of the stock
        vw: number  // Volume-weighted average price
    }>
}>}
```

Example output:
```javascript
// Stock Api Caller setup
import StockApiCaller from 'stockapicaller'; 
const stockApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey('api key')
    .setSecretKey('secret key'); 

// Get Previous Bar Data
const barData = await stockApiCaller.fetchPreviousBarData(['TSLA','AAPL'])

// barData: 
{
  AAPL: [
    {
      c: 179.72,
      h: 194.15,
      l: 174.62,
      n: 1854434,
      o: 177.2,
      t: '2025-04-07T04:00:00Z',
      v: 122998968,
      vw: 180.385536
    }
  ],
  TSLA: [
    {
      c: 230.71,
      h: 252,
      l: 214.25,
      n: 2508078,
      o: 223.78,
      t: '2025-04-07T04:00:00Z',
      v: 151686555,
      vw: 229.949454
    }
  ]
}
```

## `.fetchBarDataTimeFrame(symbol: string, timeframe: '1Min' | '15Min' | '1Hour' | '1Day', {start: <RFC-3339-date-string>, end: <RFC-3339-date-string>, limit: number})`

start and end allow: filtering data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.

returns
```javascript
{
  bars: [
    {
      c: number,    // close price
      h: number,    // highest price
      l: number,    // lowest price
      n: number,    // number of trades
      o: number,    // open price
      t: datetime,  // time stamp in  RFC-3339 format with nanosecond precision
      v: number,    // volumne
      vw: number    // volume weighted average price
    }
  ]
}
```