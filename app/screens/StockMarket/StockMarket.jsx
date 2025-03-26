import React from 'react'
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native'
import { SAMPLE_DATA } from './SampleData'
import StockItem from './StockItem'

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
