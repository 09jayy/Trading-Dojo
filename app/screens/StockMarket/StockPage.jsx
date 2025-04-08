import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const StockPage = ({ route }) => {
  const { stock } = route.params;

  const handleBuyPress = () => {
    console.log(`Buying ${stock.symbol}`);
  };

  const priceChange = stock.priceChange ?? 0;
  const priceChangeColor = priceChange >= 0 ? '#34C759' : '#FF3B30';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Stock Name */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Stock</Text>
        <Text style={styles.value}>{stock.symbol}</Text>
      </View>

      {/* Current Price + Price Change */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.priceRow}>
          <Text style={styles.value}>${stock.currentPrice?.toFixed(2)}</Text>
          <Text style={[styles.changeText, { color: priceChangeColor }]}>
            ({priceChange.toFixed(2)}%)
          </Text>
        </View>
      </View>

      {/* Buy Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>

      {/* Graph Placeholder */}
      <View style={styles.graphBox}>
        <Text style={styles.graphText}>[Graph coming soon]</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  infoBox: {
    backgroundColor: '#E9ECEF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // only supported on React Native 0.71+
  },
  changeText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  buyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  graphBox: {
    backgroundColor: '#DEE2E6',
    height: 300,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphText: {
    color: '#6C757D',
    fontSize: 16,
  },
});
