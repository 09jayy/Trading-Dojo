import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const SignTemplate = ({ buttonLabel, onPress }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        console.log(buttonLabel);
        console.log("Username:", username);
        console.log("Password:", password);
        onPress(true);
    };

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
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
        backgroundColor: 'darkblue', // ask j for hex code in logo
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
});