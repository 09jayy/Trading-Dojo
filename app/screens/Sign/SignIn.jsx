import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';
import { signIn } from './functions/SignInFunctions';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/Config/firebaseConfig';

export const SignIn = () => {
    const [username, setUsername] = useState('');
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
                    placeholder="Username..."
                    value={username}
                    onChangeText={setUsername}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={() => signIn(username, password, setSignedIn)}>
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