import { View, Text } from 'react-native'
import { styles } from '../../../screens/Sign/StyleSheet'

export const Posts = ({ route }) => {
    const { id } = route.params

    return (
        <View style={styles.container}>
            <Text>Posts</Text>
        </View>
    )
}