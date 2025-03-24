import {StyleSheet} from 'react-native'; 

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
      paddingHorizontal: 16,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    glossaryButton: {
        marginRight: 30,
    },
    glossaryIcon: {
    fontSize: 18,
    },
    balanceContainer: {
      backgroundColor: '#ddd',
      padding: 16,
      marginBottom: 12,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addButton: {
      borderWidth: 1,
      padding: 6,
      borderRadius: 4,
    },
    investedBox: {
      backgroundColor: '#ddd',
      padding: 16,
      marginBottom: 12,
      borderRadius: 10,
    },
    stockCard: {
      backgroundColor: '#ddd',
      padding: 16,
      marginBottom: 12,
      borderRadius: 10,
    },
    symbol: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    stockInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    graphNotice: {
      marginTop: 20,
      textAlign: 'center',
      color: '#444',
      fontStyle: 'italic',
    },
  });