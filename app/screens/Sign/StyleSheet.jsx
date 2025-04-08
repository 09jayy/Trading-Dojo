import {StyleSheet} from 'react-native'; 

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    dropdown: {
        marginBottom: 15,
        marginTop: 0,
        borderColor: '#ddd',
    },
    dropdownText: {
        fontSize: 16,
    },
    button: {
        width: '70%',
        backgroundColor: '#0041a8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomText: {
        marginTop: 20,
        fontSize: 14,
    },
    link: {
        color: '#0041a8',
        fontSize: 14,
        backgroundColor: 'transparent', 
    },
    sent: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginLeft: 'auto',
        maxWidth: '80%',
    },
    sentText: {
        color: '#000',
    },
    received: {
        backgroundColor: '#0041a8',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 'auto',
        maxWidth: '80%',
    },
    receivedText: {
        color: '#fff',
    },
});