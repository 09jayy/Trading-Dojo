import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import StockItem from './StockItem';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const extra = Constants.expoConfig?.extra ?? {};
const { alpacaApiKey, alpacaSecretKey } = extra;

const StockApiCaller = require('stockapicaller');

const stockList = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOGL', 'META', 'PLTR','AMD', 'JPM', 'IBM']
const getTrendingStocks = async () => {
  const result = await fetch('https://query1.finance.yahoo.com/v1/finance/trending/US');
  const data = await result.json();

  if (data.finance.result && data.finance.result[0] && data.finance.result[0].quotes) {
    return data.finance.result[0].quotes.map((q) => q.symbol);
  } else {
    console.log('Unexpected data structure:', data);
    return [];
  }
};


const getPrice = async (symbol) => {
  const alpacaApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey(alpacaApiKey)
    .setSecretKey(alpacaSecretKey);

  try {
    const result = await alpacaApiCaller.fetchLatestTradeOf(symbol);
    
    return result.trade.p;
  } catch (err) {
    console.log(`Error fetching trade for ${symbol}:`, err.message || err);
    return null;
  }
};
const getChange = async (symbol) => {
  const alpacaApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey(alpacaApiKey)
    .setSecretKey(alpacaSecretKey);

  try {
    const result = await alpacaApiCaller.fetchPreviousBarData([symbol]);
    const stockBars = result?.bars?.[symbol];

    if (!stockBars || !stockBars.length) {
      console.log(`No bar data for ${symbol}`);
      return null;
    }

    const closePrice = stockBars[0].c;
    console.log(`${symbol} previous close:`, closePrice);

    return closePrice;
  } catch (err) {
    console.log(`Error getting change for ${symbol}:`, err.message || err);
    return null;
  }
};

// Example usage
getChange('TSLA');


const getStats = async (symbol) => {
  const alpacaApiCaller = new StockApiCaller()
    .setApiService('alpaca')
    .setApiKey(alpacaApiKey)
    .setSecretKey(alpacaSecretKey);

  try {
    const result = await alpacaApiCaller.fetchStatsOf(symbol);
    console.log('hi', result)
    
  } catch (err) {
    console.log(`Error fetching trade for ${symbol}:`, err.message || err);
    return null;
  }
};
getStats('PLTR')


export const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchStockData = async () => {
      const symbols = stockList
      const stockData = await Promise.all(symbols.map(async (symbol) => {
        const price = await getPrice(symbol);
        const change = await getChange(symbol);
        const priceChange = ((price - change) / change) * 100;
        return {  
          symbol,
          currentPrice: price,
          priceChange
          
        };
      }));

      setStocks(stockData.filter(stock => stock.currentPrice !== null));
    };

    fetchStockData();

    // Set up interval to refetch every 60 seconds
    const interval = setInterval(fetchStockData, 60000);
  
    // Clean up the interval on unmount
    return () => clearInterval(interval)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <StockItem
            name={item.symbol}
            symbol={item.symbol}
            currentPrice={item.currentPrice}
            priceChangePercentage7d={item.priceChange} // Placeholder until you get 7d change
            onPress={() => navigation.navigate('StockPage', { stock: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
