import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SignTemplate } from './components/SignTemplate';
import { Logo } from "../../components/Logo";
import { signedInContext } from "../../AppContext";
import { useContext } from 'react';

export const SignUp = () => {
    const buttonLabel = "Sign Up";
    const { setSignedIn } = useContext(signedInContext); // change to sign up when logic is implemented

    return (
        <SafeAreaView style={styles.container}>
            <Logo size={0.6} debug={true} />
            <SignTemplate buttonLabel={buttonLabel} onPress={setSignedIn}/>
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
