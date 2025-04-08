import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './GlossaryStyle';

const glossaryData = [
  { term: "Market Order", definition: "Buy/sell immediately at the current price." },
  { term: "Limit Order", definition: "Buy/sell at a specific price." },
  { term: "Stop Order", definition: "Buy/sell when a certain price is reached." },
  { term: "Volatility", definition: "How much the price of an asset fluctuates. High volatility = high risk/reward." },
  { term: "Liquidity", definition: "How easily an asset can be bought/sold without affecting its price." },
  { term: "Market Capitalization", definition: "Total value of a company's outstanding shares." },
  { term: "Portfolio", definition: "Collection of investments owned by an individual or institution." },
  { term: "Asset", definition: "Any resource with economic value." },
  { term: "Equity", definition: "Ownership interest in a company." },
  { term: "Yield", definition: "Income generated from an investment." },
  { term: "Dividend", definition: "Payment made by a company to its shareholders." },
];

export const Glossary = () => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={glossaryData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.term}>{item.term}</Text>
          <Text style={styles.definition}>{item.definition}</Text>
        </View>
      )}
    />
  </SafeAreaView>
);
