import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signedInContext } from './AppContext';
import { SignIn } from './screens/Sign/SignIn';
import { SignUp } from './screens/Sign/SignUp';
import { Dashboard } from './screens/Dashboard/Dashboard';

const Tab = createBottomTabNavigator(); 

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  
  return (
    <signedInContext.Provider value={{signedIn,setSignedIn}}>
      <NavigationContainer>
        {
          signedIn == false ? (
            <Tab.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }
            >
                    <Tab.Screen name='SignIn' component={SignIn}/>
                    <Tab.Screen name='SignUp' component={SignUp}/>
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Dashboard' component={Dashboard}/>
            </Tab.Navigator>
          )
        }
      </NavigationContainer>
    </signedInContext.Provider>
  );
}
