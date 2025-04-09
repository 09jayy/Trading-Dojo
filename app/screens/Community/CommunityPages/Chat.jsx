import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../../../screens/Sign/StyleSheet'
import { db, auth } from '../../../components/Config/firebaseConfig'
import { useEffect, useState, useRef } from 'react'
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc } from 'firebase/firestore'
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'

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
        const { text, uid, name } = props.message
        
        const isCurrentUser = uid === currentUid

        print(isCurrentUser === true ? "styles.sent" : "styles.received")

        return (
            <View style={isCurrentUser === true ? styles.sent : styles.received}>
                <Text style={isCurrentUser === true ? styles.sentName : styles.receivedName}>{name}</Text>
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
                name: await getUsername(),
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error sending message: ', error)
        }

        setInput('')
    }

    const getUsername = async () => {
        const userRef = doc(db, 'users', currentUid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
            return userSnap.data().name
        } else {
            console.log('No such document!')
            return ''
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={160}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <ChatMessage message={item} />}
                        style={styles.messsageContainer}
                        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                    />

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.msgInput}
                            placeholder="Type a message..."
                            placeholderTextColor="#ddd"
                            value={input}
                            onChangeText={setInput}
                        />

                        <TouchableOpacity style={styles.msgButton} onPress={sendMessage}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}