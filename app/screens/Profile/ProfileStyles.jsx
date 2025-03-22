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
        marginTop: 20,
        marginBottom: 40
    },
    saveButton: {
        width: '20%',
        backgroundColor: '#0041a8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: "10%",
        marginBottom: 70
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
});