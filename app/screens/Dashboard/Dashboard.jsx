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
import {db} from '../../components/Config/firebaseConfig'; 
import {doc, getDocs, getDoc} from 'firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const extra = Constants.expoConfig?.extra ?? {}; 

const {alpacaApiKey, alpacaSecretKey} = extra; 

const stockApiCaller = new StockApiCaller()
  .setApiService('alpaca')
  .setApiKey(alpacaApiKey)
  .setSecretKey(alpacaSecretKey); 

export const Dashboard = () => {
    const navigation = useNavigation();
    const {setSignedIn} = useContext(signedInContext);
    const [userId, setUserId] = useState(''); 
    const [ownedShares, setOwnedShares] = useState({}); 
    const [shareWorthOvertime, setShareWorthOvertime] = useState({}); 

    useEffect(() => {
      const loadData = async () => {
          const id = await fetchUserId();
          if (!id) return;
          setUserId(id);

          console.log('id', id); 

          const shares = await fetchOwnedShares(id);
          console.log(shares.ownedShares);
          
          const priceChange = await getPriceChangesWithTime(stockApiCaller, 'TSLA','5Min'); 
          console.log(priceChange); 
          
          const ashareWorthOvertime = getShareWorthOvertime(shares.ownedShares.TSLA, priceChange)
          console.log(ashareWorthOvertime);
          setShareWorthOvertime(ashareWorthOvertime);  
        };
      console.log('error')
      loadData();
  }, [stockApiCaller]);

  useEffect(() => {
      console.log("📊 Owned Shares:", ownedShares);
      console.log("📈 Share Worth Over Time:", shareWorthOvertime);
  }, [ownedShares, shareWorthOvertime]);

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
              
              <Graph labels={shareWorthOvertime?.times || [1]} data={shareWorthOvertime?.shareWorths || [1]}/>
            </Text>
          </ScrollView>
        </SafeAreaView>
      );
    };

    
    export default Dashboard;
