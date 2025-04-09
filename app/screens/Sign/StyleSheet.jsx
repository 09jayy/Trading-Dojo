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
    chatContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    messsageContainer: {
        maxHeight: '90%',
        minHeight: '50%',
        marginBottom: "2%",
    },
    sent: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginLeft: 'auto',
        marginRight: "4%",
        maxWidth: '70%',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
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
        marginLeft: "5%",
        maxWidth: '70%',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    receivedText: {
        color: '#fff',
    },
    sentName: {
        fontWeight: 'bold',
        color: '#000',
    },
    receivedName: {
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: "5%",
        marginBottom: "8%",
    },
    msgInput: {
        flex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
    msgButton: {
        backgroundColor: '#0041a8',
        padding: 10,
        borderRadius: 10,
    },
});