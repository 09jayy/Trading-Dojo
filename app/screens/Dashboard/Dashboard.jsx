import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signedInContext } from '../../AppContext';
import { Entypo } from '@expo/vector-icons';
import { styles } from './DashboardStyles';
import { useNavigation } from '@react-navigation/native';
import StockApiCaller from 'stockapicaller'; 
import Constants from 'expo-constants'; 
import { getPriceChangesWithTime, getShareWorthOvertime, fetchUserId, fetchOwnedShares, fetchShareWorthOvertime } from './functions';
import {Graph} from './Graph';
import { StockWidget } from './StockWidget';

const extra = Constants.expoConfig?.extra ?? {}; 

const {alpacaApiKey, alpacaSecretKey} = extra; 

const stockApiCaller = new StockApiCaller()
  .setApiService('alpaca')
  .setApiKey(alpacaApiKey)
  .setSecretKey(alpacaSecretKey); 

export const Dashboard = () => {
    const navigation = useNavigation();
    const {setSignedIn} = useContext(signedInContext);
    const [ownedShares, setOwnedShares] = useState({}); 
    const [sharesWorthOvertime, setSharesWorthOvertime] = useState({}); 
    const [refreshing, setRefreshing] = useState(false); 

    const fetchData = async () => {
      setRefreshing(true);
      try {
        // 1. Fetch user ID
        const uid = await fetchUserId();
        
        // 2. Fetch owned shares
        const owned = await fetchOwnedShares(uid);
        
        const sharesCopy = JSON.parse(JSON.stringify(owned.ownedShares));
        
        setOwnedShares(sharesCopy); // previous bug of ownedShares being reset to empty, this prevents
        
        // 3. Process each stock to generate graph data
        const newShareWorth = {};
        for (const symbol in owned.ownedShares) {
          const priceChange = await getPriceChangesWithTime(
            stockApiCaller, 
            symbol,
            '1Hour', 
            { start: owned.ownedShares[symbol][0].time }
          );
          newShareWorth[symbol] = getShareWorthOvertime(
            owned.ownedShares[symbol], 
            priceChange
          );
        }
        setSharesWorthOvertime(newShareWorth);
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setRefreshing(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

  useEffect(() => {
      console.log("Owned Shares:", ownedShares);
      console.log("Share Worth Over Time:", sharesWorthOvertime);
  }, [ownedShares, sharesWorthOvertime]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Glossary')}>
                 <Text style={styles.glossary}>Glossary ❓</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Investment Overview</Text>
          </View>
    
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.balanceContainer}>
              <Text>Balance</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text>+ Add Funds</Text>
              </TouchableOpacity>
            </View>
    
            <View style={styles.investedBox}>
              <Text>Amount Invested</Text>
            </View>
    
            {Object.entries(ownedShares).map(([stockSymbol, sharesArray], index) => (
              <StockWidget
                key={stockSymbol}
                stockSymbol={stockSymbol}
                shareOrders={sharesArray}
              />
            ))}
    
            <Text style={styles.graphNotice}>
              overall portfolio performance graph (scroll down to view more)
            </Text>

            {Object.entries(sharesWorthOvertime).map(([symbol, data]) => (
              <View key={symbol}>
                <Text>{symbol}</Text>
                <Graph 
                  labels={data?.times || [1]} 
                  data={data?.shareWorths || [1]}
                />
              </View>
            ))}

            {/* Add this at the bottom of your ScrollView */}
            <TouchableOpacity 
              onPress={fetchData}
              disabled={refreshing}
            >
              <Text>{refreshing ? 'Refreshing...' : 'Refresh Data'}</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      );
    };

    
    export default Dashboard;
