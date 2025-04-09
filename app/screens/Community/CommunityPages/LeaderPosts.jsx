import { View, Text, Button, TextInput } from 'react-native'
import { db } from '../../../components/Config/firebaseConfig'
import { useEffect, useState } from 'react'
import { doc, getDoc , collection, addDoc, getDocs} from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList} from 'react-native'
import { styles } from '../CommunityStyle/PostStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'



export const LeaderPosts = ({ route }) => {
    const { id } = route.params
    const [community, setCommunity] = useState(null)
    const [posts, setPosts] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const isFocused = useIsFocused()
    const [username, setUsername] = useState('')
    const [currentUid, setCurrentUid] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'));
                setCurrentUid(user?.uid);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        }
        fetchUserData();
    }
    ,[]);

    useEffect(() => {
    const getUsername = async () => {
            const userRef = doc(db, 'users', currentUid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
                setUsername(userSnap.data().name)
            } 
        }
        getUsername()
    }, []) 
    
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
          } 
        }
    
        fetchPosts()
      }, [isFocused]) // Re-run when id changes


    const handleCreatePost = async () => {
        try {
            const docRef = doc(db, "Communities", id)
            const postsRef = collection(docRef, "Posts")
            const newPost = await addDoc(postsRef, {
                Title: newTitle,
                Content: newContent,
                CreatedBy: username,
                CreatedAt: new Date().toISOString(),
            })

            const newPostRef = await getDoc(newPost)
            const newPostData = { ...newPostRef.data(), id: newPostRef.id }
            setPosts([...posts, newPostData])
            setNewTitle('')
            setNewContent('')
            setIsExpanded(false)
            


        } catch (error) {
            console.error("Error creating post: ", error)
        }
    }

  return (
    <SafeAreaView style ={styles.container}>
        <Text style={styles.header}>{community?.name}</Text>
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{item.Title}</Text>
                <Text style={styles.postAuthor}>{item.CreatedBy}</Text>
                <Text style={styles.postContent}>{item.Content}</Text>
            </View>
            )}
        />
        <View style={styles.createCommunityContainer}>
            <Button title={isExpanded ? "Cancel" : "Create new post"} onPress={() => setIsExpanded(!isExpanded)} />
                    {isExpanded && (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                value={newTitle}
                                onChangeText={setNewTitle}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Content"
                                value={newContent}
                                onChangeText={setNewContent}
                            />
                            <Button title="Create Post" onPress={handleCreatePost}/>
                    </View>
                )}
        </View>
    </SafeAreaView>
  )
}