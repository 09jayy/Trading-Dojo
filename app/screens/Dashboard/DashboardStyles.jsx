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
    timeframeContainer: {
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
      borderRadius: 20,
      padding: 4,
      marginHorizontal: 16,
      marginVertical: 8,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    },
    timeframeButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: 'transparent'
    },
    activeButton: {
      backgroundColor: '#055deb',
      shadowColor: '#6200ee',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3
    },
    timeframeText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#666'
    },
    activeText: {
      color: '#fff',
      fontWeight: '600'
    }
  });