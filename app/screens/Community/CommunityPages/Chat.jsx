import { View, Text, Button, TextInput, FlatList } from 'react-native'
import { styles } from '../../../screens/Sign/StyleSheet'
import { db, auth } from '../../../components/Config/firebaseConfig'
import { useEffect, useState, useRef } from 'react'
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Chat = ({ route }) => {
    const { id } = route.params
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const flatListRef = useRef(null)
    const [currentUid, setCurrentUid] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'));
                setCurrentUid(user.uid);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        }
        fetchUserData();
    }
    ,[]);


    useEffect(() => {
        const messagesRef = collection(db, "Communities", id, "chat")

        const fetchMessages = async () => {
            try {
                const q = query(messagesRef, orderBy("createdAt", "asc"));
                const querySnapshot = await getDocs(q);
                const messagesData = []
                querySnapshot.forEach((doc) => {
                    messagesData.push({...doc.data(), id: doc.id})
                })
                setMessages(messagesData)
            } catch (error) {
                console.error("Error fetching messages: ", error)
            }
        }
        
        fetchMessages()
    });

    function ChatMessage(props) {
        const { text, uid } = props.message
        
        const isCurrentUser = uid === currentUid// implement later currently only for chattest@gmail.com pass is password

        print(isCurrentUser === true ? "styles.sent" : "styles.received")

        return (
            <View style={isCurrentUser === true ? styles.sent : styles.received}>
                <Text style={isCurrentUser === true ? styles.sentText : styles.receivedText}>{text}</Text>
            </View>
        )
    }

    const sendMessage = async() => {
        if (input.trim() === '') {
            return
        }

        try {
            const messageRef = collection(db, 'Communities', id, 'chat');
            await addDoc(messageRef, {
                text: input,
                uid: currentUid,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error sending message: ', error)
        }

        setInput('')
    }

    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({})
        }
    }, [messages.length])

    const test = () => {
        console.log(currentUid)
    }

    return (
        <View style={styles.chatContainer}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ChatMessage message={item} />}
                style={styles.messsageContainer}
            />

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={setInput}
                />
                <Button title="Send" style={styles.button && styles.messageInput} onPress={sendMessage} />
            </View>
        </View>
    )
}