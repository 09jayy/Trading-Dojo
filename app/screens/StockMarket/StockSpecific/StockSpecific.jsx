import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Image } from 'react-native';



export const StockSpecific = ({ route }) => {
  const { stock } = route.params;
  console.log("HELLLOOOOOOOOOOOOOOOOOOO" + stock.image);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
      <Image
          source={{ uri: stock.image }}
          style={styles.image}
        />

        <Text style={styles.title}>{stock.name}</Text>
        <Text style={styles.text}>-</Text>
        <Text style={styles.subtitle}>{stock.symbol.toUpperCase()}</Text>
      </View>

      <View style={styles.box}>
      <Text style={styles.text}>
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stock.current_price)}
      </Text>
      </View>
      <View style={styles.stats}>
        <Text style={styles.performance}>
          7 Day Change: {stock.price_change_percentage_7d_in_currency.toFixed(2)}%
        </Text>
        <Entypo
          name={
            stock.price_change_percentage_7d_in_currency >= 0
              ? 'arrow-bold-up'
              : 'arrow-bold-down'
          }
          size={18}
          color={
            stock.price_change_percentage_7d_in_currency >= 0
              ? 'green'
              : 'red'
          }
        />
      </View>

      <View style={styles.button}>
        <Text style={styles.text}>Buy</Text>
      </View>

      <View style={styles.graph}>
        <Text style={styles.text}>Graph Placeholder</Text>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.text}>Timeline</Text>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ddd',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  graph: {
    width: '90%',
    height: 250,
    backgroundColor: '#ddd',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  timeline: {
    width: '90%',
    padding: 15,
    backgroundColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  stats: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 10,
  },
  performance: {
    fontSize: 16,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#A8AFB1",
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
    resizeMode: 'contain',
    paddingRight: 10,
  }
  

});

export default StockSpecific;