import { Alert } from 'react-native';
import { signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../components/Config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

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

export const updateUsername = async (username) => {
    const user = await getUser();
    const uid = user.uid;

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
    } else {
        Alert.alert("Please enter a valid username");
        return;
    }
}

export const updateEmailHandler = async (email, oldEmail, password) => {
    if (email !== ""){
        try {
            await signInWithEmailAndPassword(auth, oldEmail, password);
            const credential = EmailAuthProvider.credential(oldEmail, password);
            const account = auth.currentUser
            await reauthenticateWithCredential(account, credential);
            await updateEmail(account, email);
            Alert.alert("Your email has been updated to: ", email);
        } catch(error) {
            Alert.alert("Error: ", "We couldn't update your email at this time please try again later", [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
            console.log("Error: ", error.message);
        }
    }
}

export const updatePasswordHandler = async (email, oldPassword, password) => {
    if (password === "" || password.length < 6) {
        Alert.alert("Please enter a valid password longer than six characters");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, oldPassword);
        const credential = EmailAuthProvider.credential(email, oldPassword);
        const account = auth.currentUser
        await reauthenticateWithCredential(account, credential);
        await updatePassword(account, password);
        Alert.alert("Your password has been updated");
    } catch(error) {
        Alert.alert("Error: ", "We couldn't update your password at this time please try again later", [{ text: "Understood" , onPress: () => console.log("Alert closed")}]);
        console.log("Error: ", error.message);
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