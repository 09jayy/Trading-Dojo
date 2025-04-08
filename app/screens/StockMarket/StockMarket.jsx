import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native'
import { SAMPLE_DATA } from './SampleData'
import StockItem from './StockItem'

const getTrendingStocks = async () => {
    const result = await fetch('https://query1.finance.yahoo.com/v1/finance/trending/US');
    const data = await result.json();

    // Check if the data structure is as expected
    if (data.finance.result && data.finance.result[0] && data.finance.result[0].quotes) {
        const quotes = data.finance.result[0].quotes;
        const stockSymbols = new Array(quotes.length); //quotes holds the stock data - just need the symbols 
        
        for (let i = 0; i < quotes.length; i++) {
            stockSymbols[i] = quotes[i].symbol; //array holds all popular stock symbols got from yahooFinance
        }

        return stockSymbols;
    } else {
        console.error('Unexpected data structure:', data);
        return [];
    }
};

const logStockSymbols = async () => {
    const symbols = await getTrendingStocks();
    console.log("STOCK SYMBOLS --- ", symbols);
};

logStockSymbols(); // Call the function that logs the stock symbols

export const StockMarket = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SAMPLE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StockItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image}
          />
        )}
        
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
