import { Alert } from 'react-native';
import { auth } from '../../../components/Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (email, password, setter) => {
    console.log("email: ", email);
    console.log("password: ", password);

    return handleSignIn(email, password, setter);
}

const handleSignIn = async (email, password, setter) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem('user', JSON.stringify(user.user));
        setter(true);
        console.log("Signed in successfully");
        return user.user.uid; 
    } catch (error) {
        console.log("Error: ", error.message);
        Alert.alert("Error: ", error.message, [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
    }
}