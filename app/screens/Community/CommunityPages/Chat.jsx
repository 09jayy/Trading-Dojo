import { View, Text, Button } from 'react-native'
import { styles } from '../../../screens/Sign/StyleSheet'
import { db, auth } from '../../../components/Config/firebaseConfig'

export const Chat = ({ route }) => {
    const { id } = route.params

    function chatRoom() {
        const messagesRef = db.collection('Communities').doc('communityId').collection('messages')

    }

    function test() {
        console.log(id)
    }

    return (
        <View style={styles.container}>
            <Text>Chat</Text>
            <Button title="Test" onPress={test} />
        </View>
    )
}