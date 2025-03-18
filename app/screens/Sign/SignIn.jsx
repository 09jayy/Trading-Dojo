import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const buttonLabel = "SIGN IN";
    const { setSignedIn } = useContext(signedInContext);
    const navigation = useNavigation();

    const signIn = () => {
        console.log("username: ", username); // replace with sign in functionality when the time comes
        console.log("password: ", password);
        setSignedIn(true);
    }

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

                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Don't have an account?{' '}
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </SafeAreaView>
    );
};