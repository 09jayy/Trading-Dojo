import React, {useState, useEffect} from 'react'; 
import {View, Text} from 'react-native'; 
import { styles } from './DashboardStyles';
import StockApiCaller from 'stockapicaller'; 
import Constants from 'expo-constants'; 
import { Entypo } from '@expo/vector-icons';

const extra = Constants.expoConfig?.extra ?? {}; 

const {alpacaApiKey, alpacaSecretKey} = extra; 

const stockApiCaller = new StockApiCaller()
  .setApiService('alpaca')
  .setApiKey(alpacaApiKey)
  .setSecretKey(alpacaSecretKey); 

/**
 * 
 * @param {string} symbol - stock symbol
 * @param {Array<{
 *  sharePrice: number,
 *  shareQuantity: number,
 *  time: string,
 *  tradeType: 'buy' | 'sell'
 * }>} shareOrders 
 * @returns 
 */
export const StockWidget = ({stockSymbol,shareOrders}) => {
    console.log('STOCK SYMBOL',stockSymbol);
    console.log(shareOrders)
    const [priceOf1Share, setPriceOf1Share] = useState(0); 
    
    useEffect(() => {
        const fetchPrice = async () => {
          const price = await stockApiCaller.fetchLatestTradeOf(stockSymbol); 
          setPriceOf1Share(price.trade.p);
        };
    
        fetchPrice();
      }, []);

    const totalShares = shareOrders.reduce((total, order) => {
        return order.tradeType === 'buy' 
            ? total + order.shareQuantity 
            : total - order.shareQuantity;
    }, 0);

    const totalSpent = shareOrders.reduce((total, order) => {
        return order.tradeType === 'buy' 
            ? total + (order.sharePrice * order.shareQuantity)
            : total - (order.sharePrice * order.shareQuantity);
    }, 0);

    return (
        <View style={styles.stockCard}>
            <Text style={styles.symbol}>{stockSymbol}</Text>
            <Text>Shared Owned - {totalShares}</Text>
            <View style={styles.stockInfo}>
                <Text>Spent - ${totalSpent.toFixed(2)}</Text>
                <View style={styles.priceRow}>
                <Text>Current Worth - ${(totalShares * priceOf1Share).toFixed(2)}</Text>
                <Entypo
                      name={((totalShares * priceOf1Share) > totalSpent) ? "arrow-bold-up" : "arrow-bold-down"}
                      size={18}
                      color={((totalShares * priceOf1Share) > totalSpent) ? "green" : "red"}
                    />
                </View>
            </View>
        </View>  
    )
}