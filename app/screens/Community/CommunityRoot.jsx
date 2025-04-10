import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityView } from "./CommunityView";
import { JoinedCommunities } from "./JoinedCommunities";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {useState} from 'react'; 

export const CommunityRoot = () => {
    const [page, setPage] = useState('joined'); 
    return (
        <>
            <View style={styles.navBar}>
                <TouchableOpacity 
                    style={[styles.navButton, page === 'joined' && styles.activeButton]} 
                    onPress={() => setPage('joined')}
                >
                    <Text style={[styles.navText, page === 'joined' && styles.activeText]}>Joined</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.navButton, page === 'community' && styles.activeButton]} 
                    onPress={() => setPage('community')}
                >
                    <Text style={[styles.navText, page === 'community' && styles.activeText]}>Community</Text>
                </TouchableOpacity>
            </View>
            {
                (page === 'joined') ? <JoinedCommunities/> : <CommunityView/> 
            }
        </>
    )
}

const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center',
      backgroundColor: '#f8f9fa',  
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd', 
    },
    navButton: {
      flex: 1, 
      alignItems: 'center', 
      paddingVertical: 10, 
      borderRadius: 5, 
    },
    activeButton: {
      borderBottomWidth: 3,
      borderBottomColor: '#007bff', 
    },
    navText: {
      fontSize: 16, 
      color: '#555', 
      fontWeight: 'bold',
    },
    activeText: {
      color: '#007bff',
    },
  });
  