import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../components/Config/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

export const CommunityView = () => {
    const [communities, setCommunities] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCommunities, setFilteredCommunities] = useState([]);
    
    useEffect(() => {
        const communitiesRef = collection(db, "Communities")
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(communitiesRef)
                const communitiesData = []
                querySnapshot.forEach((doc) => {
                    communitiesData.push({...doc.data(), id: doc.id})
                })
                setCommunities(communitiesData)
                setFilteredCommunities(communitiesData)
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        fetchData()
    }
    ,[])

    const handleSearch = (text) => {
        setSearch(text)
        const filteredCommunities = communities.filter(community => {
            return community.name.toLowerCase().includes(text.toLowerCase().replace("\n", "").trim())
        })
        setFilteredCommunities(filteredCommunities)
    }


  return (
    <SafeAreaView>
        <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
        />
        <FlatList
            data={filteredCommunities}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <View>
                <Text>{item.name}</Text>
                <Button title= "Join" onPress={() => joinCommunity(item.id)}/>
            </View>
            )}
        />
    </SafeAreaView>
  );
};