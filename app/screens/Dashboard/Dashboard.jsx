import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signedInContext } from '../../AppContext';
import { Entypo } from '@expo/vector-icons';
import { styles } from './DashboardStyles';
import { useNavigation } from '@react-navigation/native';
import StockApiCaller from 'stockapicaller'; 
import Constants from 'expo-constants'; 
import { getPriceChangesWithTime } from './functions';
import {Graph} from './Graph';
import {db} from '../../components/Config/firebaseConfig'; 
import {collection, getDocs} from 'firebase/firestore'; 
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

    useEffect(() => {
      const getUserId = async () => {
        try {
          const userString = await AsyncStorage.getItem('user'); 
          if (userString) {
            const user = JSON.parse(userString); 
            setUserId(user.uid); 
          } else {
            console.warn("No user found in storage, check async storage of user data at signing in");
          }
        } catch (error) {
          console.error("Error fetching user ID:", error); 
        }
      };
    
      getUserId(); 
    }, []);

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
              
              <Graph labels={[1,2]} data={[1,10]}/>
            </Text>
          </ScrollView>
        </SafeAreaView>
      );
    };

    
    export default Dashboard;
