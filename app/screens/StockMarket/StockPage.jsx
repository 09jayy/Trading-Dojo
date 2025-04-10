import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StockApiCaller from '@09jayy/stockapicaller';
import Constants from 'expo-constants';

export const StockPage = ({ route }) => {
  const { stock } = route.params;
  const [quantity, setQuantity] = useState('1'); // default to 1 share
  const [uid, setUid] = useState(null);
  const [stockStats, setStockStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const { alpacaApiKey, alpacaSecretKey } = Constants.expoConfig.extra;

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const uid = user.uid;
            setUid(uid);
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    }

    const fetchStockStats = async () => {
      try {
        const response = await fetch(`https://trading-dojo.onrender.com/stock/${stock.symbol}`);

        if (!response.ok) {
          throw new Error('HTTP ${response.status} - ${response.statusText}');
        }

        const text = await response.text();

        if(!text || text.trim() === '' || text === 'undefined') {
          throw new Error('empty or invalid response from server');
        }

        const json = JSON.parse(text);
        setStockStats(json);
      
      } catch (error) {
        console.error("Error fetching stock stats: ", error);
      }
    };
    const fetchChartData = async () => {
      try{
        const caller = new StockApiCaller()
          .setApiService('alpaca')
          .setApiKey(alpacaApiKey)
          .setSecretKey(alpacaSecretKey)

        const now = new Date();
        const granularity = '1H';
        const start = '2025-04-07T09:00:00Z'

        const result = await caller.fetchBarDataTimeFrame(
          stock.symbol,
          granularity,
          {
            start: start,
          }
        );

        const bars = result.bars;

        const labels = bars.map((bar,index) =>
          index % 20 === 0
          ? new Date(bar.t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', })
          : ''
        );

        const data = bars.map((bar) => bar.c);

        setChartData({
          labels,
          datasets: [{ data: data }],
        });
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    }
    fetchUserData();
    fetchStockStats();
    fetchChartData();
  }, []);

  const handleBuyPress = () => {
    const numQty = parseFloat(quantity);
    if (isNaN(numQty) || numQty <= 0) {
      Alert.alert('Invalid quantity', 'Please enter a valid number.');
      return;
    }
  
    Alert.alert(
      'Confirm Purchase',
      `Buy ${numQty} share(s) of ${stock.symbol}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const response = await fetch('https://trading-dojo.onrender.com/order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  shareQuantity: numQty,
                  userId: uid, 
                  stockSymbol: stock.symbol,
                  tradeType: 'buy',
                }),
              });
  
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
              }  

              Alert.alert(
                'Order Placed',
                `You bought ${numQty} share(s) of ${stock.symbol}`
              );
              console.log(`Order success: ${numQty} shares of ${stock.symbol}`);
            } catch (error) {
              //console.error('Buy error:', error.message);
              Alert.alert('Error', error.message || 'Failed to place order');
            }
          },
        },
      ]
    );
  };


const handleSellPress = () => {
  const numQty = parseFloat(quantity);
  if (isNaN(numQty) || numQty <= 0) {
    Alert.alert('Invalid quantity', 'Please enter a valid number.');
    return;
  }

  Alert.alert(
    'Confirm Sale',
    `Sell ${numQty} share(s) of ${stock.symbol}?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const response = await fetch('https://trading-dojo.onrender.com/order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                shareQuantity: numQty,
                userId: uid,
                stockSymbol: stock.symbol,
                tradeType: 'sell',
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Request failed');
            }

            Alert.alert(
              'Order Placed',
              `You sold ${numQty} share(s) of ${stock.symbol}`
            );
            console.log(`Sell order success: ${numQty} shares of ${stock.symbol}`);
          } catch (error) {
            //console.error('Sell error:', error.message);
            Alert.alert('Error', error.message || 'Failed to place sell order');
          }
        },
      },
    ]
  );
};

  
  

  const priceChange = stock.priceChange ?? 0;
  const priceChangeColor = priceChange >= 0 ? '#34C759' : '#FF3B30';

  if (!stockStats) {
    return (
      <View style={styles.container}>
        <Text>Loading stock details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Stock Name */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Stock</Text>
        <Text style={styles.value}>{stock.symbol}</Text>
      </View>

      {/* Current Price + Change */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.priceRow}>
          <Text style={styles.value}>${stock.currentPrice?.toFixed(2)}</Text>
          <Text style={[styles.changeText, { color: priceChangeColor }]}>
            ({priceChange.toFixed(2)}%)
          </Text>
        </View>
      </View>

      {/* Quantity Input */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="decimal-pad"
          placeholder="e.g. 0.5"
        />
      </View>

      {/* Buy Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>

      {/* Sell Button */}
      <TouchableOpacity style={styles.sellButton} onPress={handleSellPress}>
        <Text style={styles.sellButtonText}>Sell</Text>
      </TouchableOpacity>

      <View style={styles.graphBox}>
        {chartData ? (
          <View style={styles.chartWrapper}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            withDots={false}
            withInnerLines={false}
            withShadow={false}
            formatYLabel={(yValue) => `$${parseFloat(yValue).toFixed(0)}`}
            chartConfig={{
              backgroundGradientFrom: '#f8f9fa',
              backgroundGradientTo: '#f8f9fa',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '2',
                strokeWidth: '1',
                stroke: '#007bff',
              },
            }}
            style={{
              borderRadius: 8,
            }}
          />
        </View>
        ) : (
          <Text style={styles.graphText}>Loading graph...</Text>
        )}
      </View>
      {stockStats && (
        <View style={styles.stockDetailsContainer}>
          <Text style={styles.stockDetailsTitle}>📦 Stock Details</Text>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Company:</Text>
            <Text style={styles.detailValue}>{stockStats.shortName}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Region:</Text>
            <Text style={styles.detailValue}>{stockStats.region}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market:</Text>
            <Text style={styles.detailValue}>{stockStats.market}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Currency:</Text>
            <Text style={styles.detailValue}>{stockStats.currency}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market State:</Text>
            <Text style={styles.detailValue}>{stockStats.marketState}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Exchange:</Text>
            <Text style={styles.detailValue}>{stockStats.exchange}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quote Source:</Text>
            <Text style={styles.detailValue}>{stockStats.quoteSourceName}</Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Change %:</Text>
            <Text style={[styles.detailValue, { color: stockStats.regularMarketChangePercent >= 0 ? 'green' : 'red' }]}>
              {stockStats.regularMarketChangePercent?.toFixed(2)}%
            </Text>
          </View>
      
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market Time:</Text>
            <Text style={styles.detailValue}>
              {new Date(stockStats.regularMarketTime).toLocaleString()}
            </Text>
          </View>
        </View>
      )}
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
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
  },
  changeText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CED4DA',
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
  stockDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  stockDetailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    color: '#212529',
  },
  
  detailLabel: {
    fontSize: 15,
    color: '#6C757D',
    fontWeight: '500',
  },
  
  detailValue: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '500',
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomColor: '#E9ECEF',
    borderBottomWidth: 1,
  },
  
  chartWrapper: {
    backgroundColor: '#f2f2f2', 
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  sellButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  sellButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
