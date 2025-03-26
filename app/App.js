import { useEffect, useState} from 'react';
import { StatusBar } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signedInContext } from './AppContext';
import { SignIn } from './screens/Sign/SignIn';
import { SignUp } from './screens/Sign/SignUp';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from './screens/Profile/Profile';
import { CommunityView } from './screens/Community/CommunityView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator(); 

export default function App() {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setSignedIn(true);
          console.log("User session found:", JSON.parse(user));
        } else {
          console.log("No user session found");
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }

    checkIfSignedIn();
  }, [])
  
  return (
    <signedInContext.Provider value={{signedIn,setSignedIn}}>
      <StatusBar barStyle='light-content' backgroundColor='black' translucent={true}/>

      <NavigationContainer>
        {
          signedIn == false ? (
            <Tab.Navigator
              screenOptions={ ({route}) => ({
                headerShown: false,
                tabBarIcon: ( {color,size} ) => {
                  let iconName; 

                  if (route.name==='SignIn') {
                    iconName = 'log-in'; 
                  } else if (route.name === 'SignUp') {
                    iconName = 'person-add'; 
                  }

                  return <Ionicons name={iconName} size={size} color={color}/>
                }
              }
            )}
            >
              <Tab.Screen name='SignIn' component={SignIn}/>
              <Tab.Screen name='SignUp' component={SignUp}/>
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Investments' component={Dashboard}/>
              <Tab.Screen name='Stock Market' component={Dashboard}/>
              <Tab.Screen name='Communities' component={CommunityView}/>
              <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
          )
        }
      </NavigationContainer>
    </signedInContext.Provider>
  );
}
