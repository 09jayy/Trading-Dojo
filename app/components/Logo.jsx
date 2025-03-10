import {StyleSheet, Image} from 'react-native'; 

/**
 * Returns Image Component for the logo of the application 
 * 
 * @param {Object} props 
 * @param {number} props.size - multiplier to adjust size of logo image
 * @param {boolean} props.debug - if true, adds border around image for help in debug 
 * @returns {JSX.Element} 
 */
export const Logo = ({size, debug=false}) => {
    return (
        <Image source={require('../assets/logo.png')} style={
            {
                ...styles, 
                width: 2200 / 4 * size,
                height: 400 / 4 * size, 
                borderWidth: debug ? 2 : 0
            }
        }/>
    )
}

const styles = StyleSheet.create({
    resizeMode: 'contain', 
    tintColor: '#0041a8',
})