import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const buttonLabel = "Sign Up";
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
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Already have an account?{' '}
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
    },
    input: {
        width: '84%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        width: '84%',
        backgroundColor: '#0041a8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomText: {
        marginTop: 20,
        fontSize: 18,
    },
    link: {
        color: '#0041a8',
        fontSize: 18,
        marginBottom: -5,
    },
});