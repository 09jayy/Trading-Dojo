
import React, { use, useEffect, useState } from 'react'
import { View, Text} from 'react-native'
import { db } from '../../components/Config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { styles } from './CommunityStyle/DetailsStyle'

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
    <View style={styles.container}>
      {community ? (
        <View>
          <Text style={styles.header}>Community Name: {community.name}</Text>
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Members: {community.members.length}</Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}