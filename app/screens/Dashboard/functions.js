import StockApiCaller from 'stockapicaller'; 

/**
 * Returns bar data based on timeframe from start to end, (if end is not given then will default to today/recent business day)
 * @param {StockApiCaller} stockapicaller - built api caller to fetch data
 * @param {string} symbol 
 * @param {'1Min' | '1Hour' | '15Min' | '1Day'} timeframe 
 * @param {Object} dates
 * @returns {Array<{time: string, change: number}>}  
 */
export const getPriceChangesWithTime = async (stockapicaller,symbol, timeframe, {start = null, end = null} = {}) => {
    const bars = await stockapicaller.fetchBarDataTimeFrame(symbol, timeframe, {start: (start) ? start : null, end: (end) ? end : null}); 
    console.log(bars);
    const percentageChange = []
    for (let i = 1; i < bars.bars.length; i++) {
        const change = (bars.bars[i].c - bars.bars[i-1].c) / bars.bars[i-1].c; 
        percentageChange.push({time: bars.bars[i].t, change: change}); 
    }
    return percentageChange; 
}