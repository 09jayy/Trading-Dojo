import { React, useContext } from 'react';
import { Logo } from "../../../components/Logo";
import { Pressable } from 'react-native';
import { signedInContext } from '../../../AppContext';

export const SignTemplate = () => {
    const { setSignedIn } = useContext(signedInContext);

    return (
        <Pressable onPress={() => setSignedIn(true)}>
            <Logo size={0.6} debug={false} />
        </Pressable>
    );
};