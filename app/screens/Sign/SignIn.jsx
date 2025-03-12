import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignTemplate } from './components/SignTemplate';

export const SignIn = () => {
    return (
        <SignTemplate>
            <Text>Sign In</Text>
        </SignTemplate>
    )
}