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
} from 'react-native';

export const StockPage = ({ route }) => {
  const { stock } = route.params;
  const [quantity, setQuantity] = useState('1'); // default to 1 share
  const [uid, setUid] = useState(null);

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
    fetchUserData();
}
,[]);

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
              console.error('Buy error:', error.message);
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
            console.error('Sell error:', error.message);
            Alert.alert('Error', error.message || 'Failed to place sell order');
          }
        },
      },
    ]
  );
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
