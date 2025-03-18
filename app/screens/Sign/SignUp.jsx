import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const buttonLabel = "SIGN UP";
    const { setSignedIn } = useContext(signedInContext); // change to sign up when logic is implemented also change signUp function
    const navigation = useNavigation();

    const signUp = () => {
        console.log("username: ", username); // replace with sign up functionality when the time comes
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("passwordConfirmation: ", passwordConfirmation);
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
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={signUp}>
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