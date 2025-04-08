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

    useEffect(()=>{
      // load user id and owned shares
      const loadUserData = async () => {
        // load user id from async storage
        const uid = await fetchUserId();

        // load owned shares from firestore
        const owned = await fetchOwnedShares(uid);
        setOwnedShares(owned.ownedShares); 
      }
      loadUserData()
    },[])



    useEffect(() => {
      const loadShareWorthData = async () => {
        if (!ownedShares || Object.keys(ownedShares).length === 0) return;
    
        try {
          const newShareWorth = {};
          
          // Process each symbol sequentially
          for (const symbol in ownedShares) {
            if (!ownedShares[symbol]?.length) continue;
    
            try {
              const priceChange = await getPriceChangesWithTime(
                stockApiCaller, 
                symbol,
                '1Hour', 
                { start: ownedShares[symbol][0].time }
              );
    
              if (priceChange?.length) {
                newShareWorth[symbol] = getShareWorthOvertime(
                  ownedShares[symbol], 
                  priceChange
                );
              }
            } catch (error) {
              console.error(`Failed processing ${symbol}:`, error);
            }
          }
    
          setSharesWorthOvertime(prev => ({
            ...prev,
            ...newShareWorth
        }));
        } catch (error) {
          console.error("Failed loading share worth data:", error);
        }
      };
    
      loadShareWorthData();
  }, [ownedShares, stockApiCaller]);

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
    
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.stockCard}>
                <Text style={styles.symbol}>Stock Symbol</Text>
                <View style={styles.stockInfo}>
                  <Text>Bought at -</Text>
                  <View style={styles.priceRow}>
                    <Text>Current Price - </Text>
                    <Entypo
                      name={i < 2 ? "arrow-bold-up" : "arrow-bold-down"}
                      size={18}
                      color={i < 2 ? "green" : "red"}
                    />
                  </View>
                </View>
              </View>       
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
          </ScrollView>
        </SafeAreaView>
      );
    };

    
    export default Dashboard;
