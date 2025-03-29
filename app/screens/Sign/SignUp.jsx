import { SafeAreaView } from 'react-native-safe-area-context';
import {React, useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { signedInContext } from "../../AppContext";
import { useNavigation } from '@react-navigation/native';
import { styles } from './StyleSheet';
import { signUp } from './functions/SignUpFunctions';
import { SelectList } from 'react-native-dropdown-select-list'

export const SignUp = () => {
    const [role, setRole] = useState('');
    const roles = [
        { key: 'Trader', value: 'trader' },
        { key: 'Leader', value: 'leader' }
    ];
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
                <SelectList 
                    boxStyles={styles.input}
                    dropdownStyles={styles.dropdown}
                    dropdownTextStyles={styles.dropdownText}
                    inputStyles={styles.dropdownText}
                    setSelected={(val) => setRole(val)} 
                    data={roles} 
                    save="value"
                    placeholder='Select Role...'
                    search={false}
                    maxHeight={90}
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
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={() => signUp(role, email, password, passwordConfirmation, setSignedIn)}>
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