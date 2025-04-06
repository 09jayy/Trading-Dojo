// screens/CommunityDetail.js
import React, { use, useEffect, useState } from 'react'
import { View, Text} from 'react-native'
import { db } from '../../components/Config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export const CommunityDetail = ({ route }) => {
  const { id } = route.params
  const [community, setCommunity] = useState(null)

useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const docRef = doc(db, "Communities", id)
        const docSnap = await getDoc(docRef)
        setCommunity(docSnap.data())
        console.log("Community data: ", docSnap.data())
      } catch (error) {
        console.error("Error fetching community: ", error)
      } finally {
      }
    }

    fetchCommunity()
  }, [id]) // Re-run when id changes
    
  return (
    <View>
        {community ? (
            <View>
            <Text>Community Name: {community.name}</Text>
            <Text>Members: {community.members.length}</Text>
            <Text>Description: {community.}</Text>
            </View>
        ) : (
            <Text>Loading...</Text>
        )}
    </View>
  )
}