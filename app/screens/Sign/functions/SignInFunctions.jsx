import { Alert } from 'react-native';
import { auth } from '../../../components/Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = (email, password, setter) => {
    console.log("email: ", email);
    console.log("password: ", password);

    handleSignIn(email, password, setter);
}

const handleSignIn = async (email, password, setter) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setter(true);
        console.log("Signed in successfully");
    } catch (error) {
        console.log("Error: ", error.message);
        Alert.alert("Error: ", error.message, [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
    }
}