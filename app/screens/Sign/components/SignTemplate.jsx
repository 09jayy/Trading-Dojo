import { React, useContext } from 'react';
import { Logo } from "../../../components/Logo";
import { Pressable } from 'react-native';
import { signedInContext } from '../../../AppContext';
import { signIn } from '../functions/SignInFunctions';

export const SignTemplate = () => {
    const { setSignedIn } = useContext(signedInContext);
    const email = "user@gmail.com"; // change this to the test user details you make on your firebase
    const password = "password";

    return (
        <Pressable onPress={() => signIn(email, password, setSignedIn)}>
            <Logo size={0.6} debug={false} />
        </Pressable>
    );
};