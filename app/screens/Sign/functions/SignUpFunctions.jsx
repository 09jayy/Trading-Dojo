import { Alert } from 'react-native';
import { auth } from '../../../components/Config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../components/Config/firebaseConfig';
import { serverTimestamp } from "firebase/firestore";

export const signUp = (email, password, passwordConfirmation, setter) => {
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("passwordConfirmation: ", passwordConfirmation);

    if (password === passwordConfirmation) {
        handleSignUp(email, password, setter);
    } else {
        console.log("Passwords do not match");
        Alert.alert("Error: ", "Passwords do not match", [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
    }
}

const handleSignUp = async (email, password, setter) => {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            name: "", 
            email: user.email,
            communities: [],
            createdAt: serverTimestamp()
        });
        setter(true);
        console.log("Signed up successfully");
    } catch (error) {
        let errorMessage = error.message;
        console.log("Error: ", errorMessage);
        Alert.alert("Error: ", errorMessage, [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);

        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This Email already in use";
        } else if (error.code === 'auth.invalid-email') {
            errorMessage = "The email address is not valid";
        } else if (error.code === 'auth/weak-password') {
            errorMessage = "The password is too weak - it must be at least 6 characters";
        }
    }
}