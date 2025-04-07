import { Alert } from 'react-native';
import { signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from '../../../components/Config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDoc, doc } from 'firebase/firestore';

export const update = async (email, username, password, confirmPassword) => {
    user = await getUser();
    uid = user.uid;
    if (uid === null) {
        Alert.alert("Error: ", "We cannot update at this time, please try again later", [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
        return;
    }
    
    updateEmailHandler(email);
    updateUsername(username, uid);
    updatePasswordHandler(password, confirmPassword);
}

const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      } else {
        console.log("No user session found");
        return null;
      }
    } catch (error) {
      console.log("Error: ", error.message);
      return null;
    }
}

const updateEmailHandler = (email, user) => {
    console.log("email: ", email);

    if (email !== ""){
                    Alert.alert("Your email has been updated to: ", email);
            }
}

const updateUsername = (username, uid) => {
    console.log("username: ", username);
    if (username !== "") {
        const userRef = doc(db, "users", uid);
        try {
            updateDoc(userRef, {
                name: username
            });
            Alert.alert("Your username has been updated to: ", username);
        } catch {
            Alert.alert("Error: ", "Could not update username, please try again later", [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
            console.log("Error: ", error.message);
        }
    }
}

const updatePasswordHandler = (password, confirmPassword) => {
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