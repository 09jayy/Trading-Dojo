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


export const Dashboard = () => {
    const navigation = useNavigation();
    const {setSignedIn} = useContext(signedInContext)
    const balanceLimit = 20000; 
    const [modalVisible, setModalVisible] = useState(false);
    const [balance, setBalance] = useState(0);
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    

    useEffect(() => {
        const fetchOrInitBalance = async () => {
          if (!userId) return;

          const userRef = doc(db, 'users', userId);
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

        fetchOrInitBalance();
    }, [userId]);

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
              <Text>Balance: £{balance.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
                    text2: `£${amount.toFixed(2)} successfully added to your balance.`,
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
