import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { Logo } from "../../components/Logo";
import { signedInContext } from "../../AppContext";
import { useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/Config/firebaseConfig';

export const SignIn = () => {
    const buttonLabel = "Sign In";
    const { setSignedIn } = useContext(signedInContext);

    const handleSignIn = async (email, password) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setSignedIn(true);
            console.log('Signed in successfully');
        } catch (error) {
            Alert.alert('Error', 'You have entered an invalid username or password.', [
                { text: 'Understood' , onPress: () => console.log('Alert closed') }
            ]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo size={0.6} debug={true} />
            <SignTemplate buttonLabel={buttonLabel} onPress={handleSignIn}/>
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