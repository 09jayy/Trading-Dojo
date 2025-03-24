import { useContext, useState } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProfileStyles';
import { signedInContext } from '../../AppContext';
import { update, signOutHandler } from './functions/ProfileFunctions';

export const Profile = () => {
    const {setSignedIn} = useContext(signedInContext)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.photoContainer}>
                    <View style={styles.photo}>
                        <Text>Photo</Text>
                    </View>

                    <View style={styles.circleContainer}>
                        <View style={styles.circle}></View>
                        <Text style={styles.circleText}>Upload New Photo</Text>
                    </View>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Email..."
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username..."
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password...'
                    value={password}
                    onChangeText={setPassword}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password...'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={()=>update(email, username, password, confirmPassword)}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>signOutHandler(setSignedIn)}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}