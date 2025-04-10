import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signedInContext } from '../../AppContext';
import { Entypo } from '@expo/vector-icons';
import { styles } from './DashboardStyles';
import { useNavigation } from '@react-navigation/native';
import AddFundsModal from './AddFundsModal';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../components/Config/firebaseConfig';
import { getAuth } from 'firebase/auth';
import Toast from 'react-native-toast-message';
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
    const {setSignedIn, uid} = useContext(signedInContext)
    const balanceLimit = 20000; 
    const [modalVisible, setModalVisible] = useState(false);
    const [balance, setBalance] = useState(0);
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const [ownedShares, setOwnedShares] = useState({}); 
    const [sharesWorthOvertime, setSharesWorthOvertime] = useState({}); 
    const [refreshing, setRefreshing] = useState(false); 
    const [timeframeSelect, setTimeFrameSelect] = useState('1Hour')

    useEffect(() => {
        const fetchOrInitBalance = async () => {
          const userRef = doc(db, 'users', uid);
          const snapshot = await getDoc(userRef);
          if(!snapshot.exists()) {
            await setDoc(userRef, { balance: 0});
            setBalance(0);
          } else {
            const data = snapshot.data();
            const currentBalance = data?.balance || 0;

            if(currentBalance === undefined || currentBalance === null) {
              await setDoc(userRef, { balance: 0 });
              setBalance(0);
            } else {
              setBalance(currentBalance);
            }
          }
        };
        console.log('update BALANCE')
        fetchOrInitBalance();
    }, [userId, ownedShares]);

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
          let priceChange = await getPriceChangesWithTime(
            stockApiCaller, 
            symbol,
            timeframeSelect, 
            { start: owned.ownedShares[symbol][0].created.split('.')[0] + 'Z'}
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
    }, [timeframeSelect]);

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
              <Text>Balance: ${balance.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
              Portfolio Performance Graph
            </Text>

            <View style={styles.timeframeContainer}>
              <TouchableOpacity 
                style={[
                  styles.timeframeButton,
                  timeframeSelect === '1Day' && styles.activeButton
                ]}
                onPress={() => setTimeFrameSelect('1Day')}
              >
                <Text style={[
                  styles.timeframeText,
                  timeframeSelect === '1Day' && styles.activeText
                ]}>
                  1 Day
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.timeframeButton,
                  timeframeSelect === '1Hour' && styles.activeButton
                ]}
                onPress={() => setTimeFrameSelect('1Hour')}
              >
                <Text style={[
                  styles.timeframeText,
                  timeframeSelect === '1Hour' && styles.activeText
                ]}>
                  1 Hour
                </Text>
              </TouchableOpacity>
            </View>

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
          <AddFundsModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={async (amount) => {
              try {
                const auth = getAuth();
                const userId = auth.currentUser?.uid;

                if (!userId) {
                  alert('User not signed in!');
                  return;
                }

                if (balance + amount > balanceLimit) {
                  alert(`Balance limit exceeded! Maximum is ${balanceLimit}`);
                  return;
                }

                const userRef = doc(db, 'users', userId); 
                const newBalance = balance + amount;
                await updateDoc(userRef, { balance: newBalance });
                setBalance(newBalance);
                setModalVisible(false);
                setTimeout(() => {
                  Toast.show({
                    type: 'success',
                    text1: '✅ Funds Added!',
                    text2: `$${amount.toFixed(2)} successfully added to your balance.`,
                    position: 'bottom',
                  });
                }, 500);
              } catch (error) {
                console.error('Error adding funds:', error);
                alert('Failed to add funds.');
              }
            }}
            currentBalance={balance}
            limit={balanceLimit}
          />
        </SafeAreaView>
      );
    };
    export default Dashboard;
