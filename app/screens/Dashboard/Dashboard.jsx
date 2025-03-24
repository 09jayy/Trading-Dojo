import { useContext } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signedInContext } from '../../AppContext';

export const Dashboard = () => {
    const {setSignedIn} = useContext(signedInContext)

    return (
        <SafeAreaView>
            <Text></Text>
        </SafeAreaView>
    )
}