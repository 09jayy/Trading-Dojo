import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { Logo } from "../../components/Logo";
import { signedInContext } from "../../AppContext";
import { useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/Config/firebaseConfig';

export const SignUp = () => {
    const buttonLabel = "Sign Up";
    const { setSignedIn } = useContext(signedInContext);

    const handleSignUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSignedIn(true);
            console.log('Signed up successfully');
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use.'
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is not valid.'
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak - it must be at least 6 characters.'
            }
            Alert.alert('Error', errorMessage, [
                { text: 'Understood', onPress: () => console.log('Alert closed') }
            ]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Logo size={0.6} debug={true} />
            <SignTemplate buttonLabel={buttonLabel} onPress={handleSignUp}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        marginTop: 150,
        alignItems: 'center',
    },
});
