import { View, Text, Button, TextInput } from 'react-native'
import { styles } from '../../../screens/Sign/StyleSheet'
import { db } from '../../../components/Config/firebaseConfig'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Chat = ({ route }) => {
    const { id } = route.params
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [CurrentID, setCurrentID] = useState("Yc1m8LbeyCaC8ZkdN5oav7zANJD3")

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
        
        const isCurrentUser = uid === CurrentID // implement later currently only for chattest@gmail.com pass is password

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

        const uid = CurrentID // implement later currently only for chattest@gmail.com pass is password

        try {
            const messageRef = collection(db, 'Communities', id, 'chat');
            await addDoc(messageRef, {
                text: input,
                uid: uid,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error sending message: ', error)
        }

        setInput('')
    }

    return (
        <View style={styles.container}>
            <View>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={setInput}
                />
                <Button title="Send" style={styles.button} onPress={sendMessage} />
            </View>
        </View>
    )
}