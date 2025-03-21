import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';
import { signUp } from './functions/SignUpFunctions';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const buttonLabel = "SIGN UP";
    const { setSignedIn } = useContext(signedInContext); // change to sign up when logic is implemented also change signUp function
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <SignTemplate />
            
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email..."
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password..."
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={() => signUp(email, password, passwordConfirmation, setSignedIn)}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Already have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Login</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};