import { View, Text } from 'react-native'
import { collection } from 'firebase/firestore'
import { db } from '../../../components/Config/firebaseConfig'
import { useEffect, useState } from 'react'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList} from 'react-native'
import { styles } from '../CommunityStyle/PostStyle'

export const Posts = ({ route }) => {
    const { id } = route.params
    const [community, setCommunity] = useState(null)
    const [posts, setPosts] = useState([])
    const isFocused = useIsFocused()
    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const docRef = doc(db, "Communities", id)
            const docSnap = await getDoc(docRef)
            setCommunity(docSnap.data())
            const postsRef = collection(docRef, "Posts")
            const postsSnapshot = await getDocs(postsRef)
            const postsData = postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setPosts(postsData)
          } catch (error) {
            console.error("Error fetching community: ", error)
          } finally {
          }
        }
    
        fetchPosts()
      }, [id]) // Re-run when id changes

  return (
    <SafeAreaView style ={styles.container}>
        <Text style={styles.header}>{community?.name}</Text>
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{item.Title} {item.CreatedBy}</Text>
                <Text style={styles.postAuthor}>{item.CreatedBy}</Text>
                <Text style={styles.postContent}>{item.Content}</Text>
            </View>
            )}
        />
    </SafeAreaView>
  )
}