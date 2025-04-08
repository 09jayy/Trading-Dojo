import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../components/Config/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDocs, collection} from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


export const JoinedCommunities = () => {

    const [communities, setCommunities] = useState([]);
    const [uid, setUid] = useState(null);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    

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
    
    useEffect(() => {
        if (uid && isFocused) {
            const communitiesRef = collection(db, "Communities")
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(communitiesRef)
                    const communitiesData = []
                    querySnapshot.forEach((doc) => {
                        communitiesData.push({...doc.data(), id: doc.id})
                    })
                    const filteredCommunities = communitiesData.filter(community => {
                        return community.members.includes(uid);
                    })
                    setCommunities(filteredCommunities)
                } catch (error) {
                    console.error("Error fetching data: ", error)
                }
            }
            fetchData()
        }
    }
    ,[uid, isFocused]);
    
        return(
        <SafeAreaView>
            <View>
                <Text>Communities you have joined:</Text>
                <FlatList
                    data={communities}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <View>
                        <TouchableOpacity onPress={() => navigation.navigate('CommunityDetailTabs', {id: item.id})}><Text>{item.name}</Text></TouchableOpacity>
                    </View>}
                />
            </View>
        </SafeAreaView>
        )
}