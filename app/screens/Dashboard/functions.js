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
export const getShareWorthOvertime = (shareOrder, percentageChange) => {
    let times = [];
    let shareWorths = [];
    let ownedShares = 0;
    let currentPrice = 0; // Track the current market price
    
    // Sort all inputs by time
    shareOrder.sort((a, b) => new Date(a.time) - new Date(b.time));
    percentageChange.sort((a, b) => new Date(a.time) - new Date(b.time));

    // Initialize with first order
    if (shareOrder.length > 0) {
        const firstOrder = shareOrder[0];
        currentPrice = firstOrder.sharePrice;
        if (firstOrder.tradeType === 'buy') {
            ownedShares = firstOrder.shareQuantity;
        }
        times.push(firstOrder.time);
        shareWorths.push(firstOrder.sharePrice * firstOrder.shareQuantity);
    }

    let orderIndex = 1; // Start from the second order
    let changeIndex = 0;

    // Process all percentage changes
    while (changeIndex < percentageChange.length) {
        const { time: changeTime, change } = percentageChange[changeIndex];
        
        // Process all orders that occur before this percentage change
        while (orderIndex < shareOrder.length && 
                new Date(shareOrder[orderIndex].time) <= new Date(changeTime)) {
            const order = shareOrder[orderIndex];
            
            // First apply any price changes from previous percentage changes
            if (changeIndex > 0) {
                const lastChange = percentageChange[changeIndex - 1].change;
                currentPrice *= (1 + lastChange);
            }
            
            // Then process the order
            if (order.tradeType === 'buy') {
                ownedShares += order.shareQuantity;
                currentPrice = order.sharePrice; // Update to most recent buy price
            } else if (order.tradeType === 'sell') {
                ownedShares = Math.max(ownedShares - order.shareQuantity, 0);
            }
            
            times.push(order.time);
            shareWorths.push(ownedShares * currentPrice);
            orderIndex++;
        }
        
        // Apply the current percentage change
        currentPrice *= (1 + change);
        
        // Add the point after percentage change
        times.push(changeTime);
        shareWorths.push(ownedShares * currentPrice);
        
        changeIndex++;
    }
    
    // Process any remaining orders after the last percentage change
    while (orderIndex < shareOrder.length) {
        const order = shareOrder[orderIndex];
        
        // Apply the last percentage change
        if (percentageChange.length > 0) {
            const lastChange = percentageChange[percentageChange.length - 1].change;
            currentPrice *= (1 + lastChange);
        }
        
        if (order.tradeType === 'buy') {
            ownedShares += order.shareQuantity;
            currentPrice = order.sharePrice;
        } else if (order.tradeType === 'sell') {
            ownedShares = Math.max(ownedShares - order.shareQuantity, 0);
        }
        
        times.push(order.time);
        shareWorths.push(ownedShares * currentPrice);
        orderIndex++;
    }

    return { times, shareWorths };
};