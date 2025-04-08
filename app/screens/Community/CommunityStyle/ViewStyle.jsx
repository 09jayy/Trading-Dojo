import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    communityCard: {
        padding: 15,
        backgroundColor: '#0041a8',
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    communityName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    button: {
        backgroundColor: '#0041a8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        color: '#0041a8'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
