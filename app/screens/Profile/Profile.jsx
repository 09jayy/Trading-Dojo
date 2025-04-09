import { useContext, useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProfileStyles';
import { signedInContext } from '../../AppContext';
import { updateEmailHandler, updateUsername, updatePasswordHandler, signOutHandler } from './functions/ProfileFunctions';

export const Profile = () => {
    const {setSignedIn} = useContext(signedInContext);
    const [email, setEmail] = useState("")
    const [oldEmail, setOldEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [ usernameModalVisible, setUsernameModalVisible] = useState(false)
    const [ emailModalVisible, setEmailModalVisible] = useState(false)
    const [ passwordModalVisible, setPasswordModalVisible] = useState(false)

    const handleUsernameChange = async () => {
        await updateUsername(username);
        setUsernameModalVisible(false);
        setUsername("");
    }

    const handleEmailChange = async () => {
        await updateEmailHandler(email, oldEmail, password);
        setEmailModalVisible(false);
        setEmail("");
        setOldEmail("");
        setPassword("");
    }

    const handlePasswordChange = async () => {
        await updatePasswordHandler(email, oldPassword, password);
        setPasswordModalVisible(false);
        setPassword("");
        setOldPassword("");
        setEmail("");
    }

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

                <TouchableOpacity style={styles.saveButton} onPress={()=> setEmailModalVisible(true)}>
                    <Text style={styles.buttonText}>Update Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={()=> setUsernameModalVisible(true)}>
                    <Text style={styles.buttonText}>Update Username</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={()=> setPasswordModalVisible(true)}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>signOutHandler(setSignedIn)}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            <Modal visible={usernameModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Update Username</Text>
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter new username..."
                            value={username}
                            onChangeText={setUsername}
                        />
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => handleUsernameChange()}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setUsernameModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={emailModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Update Email</Text>
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter new Email..."
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter old Email..."
                            value={oldEmail}
                            onChangeText={setOldEmail}
                        />
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter Password..."
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => handleEmailChange()}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setEmailModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={passwordModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Update Password</Text>
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter Email..."
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter old Password..."
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TextInput
                            style={styles.inputModal}
                            placeholder="Enter New Password..."
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => handlePasswordChange()}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setPasswordModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}