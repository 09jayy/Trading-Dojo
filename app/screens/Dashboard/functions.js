import StockApiCaller from 'stockapicaller'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../components/Config/firebaseConfig'; 
import {doc, getDocs, getDoc} from 'firebase/firestore'; 

export const fetchUserId = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        return userString ? JSON.parse(userString).uid : null;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return null;
    }
};

export const fetchOwnedShares = async (userId) => {
    if (!userId) return {};
    try {
        console.log('Fetching owned shares...');
        const docSnap = await getDoc(doc(db, 'users', userId));
        return docSnap.exists() ? docSnap.data() : {};
    } catch (error) {
        console.error("Error fetching owned shares:", error);
        return {};
    }
};

/**
 * Returns bar data based on timeframe from start to end, (if end is not given then will default to today/recent business day)
 * @param {StockApiCaller} stockapicaller - built api caller to fetch data
 * @param {string} symbol 
 * @param {'1Min' | '1Hour' | '15Min' | '1Day'} timeframe 
 * @param {Object} dates
 * @returns {Array<{time: string, change: number}>}  
 */
export const getPriceChangesWithTime = async (stockapicaller,symbol, timeframe, {start = null, end = null} = {}) => {
    console.log('function called')
    const bars = await stockapicaller.fetchBarDataTimeFrame(symbol, timeframe, {start: (start) ? start : null, end: (end) ? end : null}); 
    console.log(bars);
    const percentageChange = []
    for (let i = 1; i < bars.bars.length; i++) {
        const change = (bars.bars[i].c - bars.bars[i-1].c) / bars.bars[i-1].c; 
        percentageChange.push({time: bars.bars[i].t, change: change}); 
    }
    return percentageChange; 
}

/**
 * Converts share price and share orders into worth overtime
 * @param {Array<{
 *  sharePrice: number, 
 *  shareQuantity: number,
 *  time: string,
 *  tradeType: 'buy' | 'sell'
 * }>} shareOrder - all stock orders from user of that same stock symbol
 * 
 * @param {Array<{
 *  time: string, 
 *  change: number
 * }>} percentageChange - percentage change from previous timing of share price for stock 
 * 
 * @returns {Array<{shareWorth: number, time: string}>} - owned shares worth overtime 
 */
export const getShareWorthOvertime = (shareOrder,percentageChange) => {
    let times = [];
    let shareWorths = [];
    let ownedShares = 0;
    let lastPrice = null;

    // Sort orders by time to ensure chronological calculations
    shareOrder.sort((a, b) => new Date(a.time) - new Date(b.time));

    for (let i = 0; i < percentageChange.length; i++) {
        let { time, change } = percentageChange[i]; // Change is a decimal (e.g., 0.05 for 5%)

        // Process all orders up to the current time
        while (shareOrder.length > 0 && new Date(shareOrder[0].time) <= new Date(time)) {
            let order = shareOrder.shift();
            if (order.tradeType === 'buy') {
                ownedShares += order.shareQuantity;
                lastPrice = order.sharePrice; // Update last known price from buy
            } else if (order.tradeType === 'sell') {
                ownedShares -= order.shareQuantity;
                ownedShares = Math.max(ownedShares, 0); // Prevent negative shares
            }
        }

        // Apply percentage change to last known price
        if (i > 0) {
            lastPrice *= (1 + change); // Since change is already a decimal
        }

        // Calculate total worth
        let shareWorth = ownedShares * lastPrice;

        // Ensure no NaN or Infinity values
        shareWorth = isFinite(shareWorth) ? shareWorth : 0;


        // Store values for graph plotting
        times.push(time);
        shareWorths.push(shareWorth);
    }

    return { times, shareWorths };
};