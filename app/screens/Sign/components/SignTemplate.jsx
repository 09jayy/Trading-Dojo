import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const SignTemplate = ({ buttonLabel, onPress }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signpress = () => {
        console.log(buttonLabel);
        console.log("email:", email);
        console.log("Password:", password);
        onPress(email, password);
    };

    return (
        <View style={styles.formContainer}>
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

            <TouchableOpacity style={styles.button} onPress={signpress}>
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