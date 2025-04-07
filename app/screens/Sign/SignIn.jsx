import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';
import { signIn } from './functions/SignInFunctions';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const buttonLabel = "SIGN IN";
    const { setSignedIn } = useContext(signedInContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <SignTemplate />

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email..."
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={() => signIn(email, password, setSignedIn)}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Don't have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>Sign up</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};