import { Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../components/Config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const update = (email, username, password, confirmPassword) => {
    updateEmail(email);
    updateUsername(username);
    updatePassword(password, confirmPassword);
}

const updateEmail = (email) => {
    console.log("email: ", email);

    if (email !== ""){
        Alert.alert("Your email has been updated to: ", email);
    }
}

const updateUsername = (username) => {
    console.log("username: ", username);
    if (username !== ""){
        Alert.alert("Your username has been updated to: ", username);
    }
}

const updatePassword = (password, confirmPassword) => {
    console.log("password: ", password)
    console.log("confirmation: ", confirmPassword)
    if((password === confirmPassword) && (password !== "")){
        Alert.alert("Your password has been updated to: ", password);
    }
}

export const signOutHandler = async (setter) => {
    try {
        await signOut(auth);
        await AsyncStorage.removeItem('user');
        setter(false);
        console.log("Signed out successfully");
    } catch (error) {
        console.log("Error: ", error.message);
        Alert.alert("Error: ", error.message, [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
    }
}