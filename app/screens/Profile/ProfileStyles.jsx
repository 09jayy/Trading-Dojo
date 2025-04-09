import {StyleSheet} from 'react-native'; 

export const styles = StyleSheet.create({
    photo: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleContainer: {
        alignItems: 'center',
        paddingLeft: 50
    },
    circle: {
        width: '40',
        height: '40',
        borderRadius: 20,
        backgroundColor: '#d3d3d3'
    },
    circleText: {
        paddingTop: 10,
        fontSize: 12
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    container: {
        width: '100%',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '100%',
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
    button: {
        width: '80%',
        backgroundColor: '#0041a8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 40
    },
    saveButton: {
        width: '80%',
        backgroundColor: '#0041a8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputModal: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#0041a8',
        borderRadius: 8,
        alignItems: 'center',
    },
});