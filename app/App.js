import {useState} from 'react';
import { StatusBar } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signedInContext } from './AppContext';
import { SignIn } from './screens/Sign/SignIn';
import { SignUp } from './screens/Sign/SignUp';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { CommunityView } from './screens/Community/CommunityView';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator(); 

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  
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
              <Tab.Screen name='Dashboard' component={Dashboard}/>
              <Tab.Screen name='Communities' component={CommunityView}/>
            </Tab.Navigator>
          )
        }
      </NavigationContainer>
    </signedInContext.Provider>
  );
}
