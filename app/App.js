import { useEffect, useState} from 'react';
import { StatusBar } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signedInContext } from './AppContext';
import { SignIn } from './screens/Sign/SignIn';
import { SignUp } from './screens/Sign/SignUp';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Glossary } from './screens/Glossary/Glossary';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from './screens/Profile/Profile';
import { StockMarket } from './screens/StockMarket/StockMarket';
import { CommunityView } from './screens/Community/CommunityView';
import { JoinedCommunities } from './screens/Community/JoinedCommunities';
import {CommunityDetail} from './screens/Community/CommunityDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Posts } from './screens/Community/CommunityPages/Posts';
import { Chat } from './screens/Community/CommunityPages/Chat';
import { useRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

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
    <signedInContext.Provider value={{ signedIn, setSignedIn }}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent={true} />

      <NavigationContainer>
        {signedIn ? (
          <Stack.Navigator>
            {/* Tabs for signed-in users */}
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            {/* Glossary is outside the tabs */}
            <Stack.Screen
              name="Glossary"
              component={Glossary}
              options={{ title: 'Glossary', fullScreenGestureEnabled: true }}
            />

            <Stack.Screen
            name="CommunityDetailTabs"
            component={CommunityDetailTabs}
            options={{ title: "", fullScreenGestureEnabled: true }}
            />

          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Tabs for Sign In / Sign Up */}
            <Stack.Screen name="AuthTabs" component={AuthTabs} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </signedInContext.Provider>
  );
}

// Signed-out tab navigator (SignIn & SignUp)
const AuthTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'SignIn') iconName = 'log-in';
        else if (route.name === 'SignUp') iconName = 'person-add';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="SignIn" component={SignIn} />
    <Tab.Screen name="SignUp" component={SignUp} />
  </Tab.Navigator>
);

// Signed-in tab navigator (Dashboard, Profile, etc.)
const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Investments" component={Dashboard} />
    <Tab.Screen name="Stock Market" component={StockMarket} />
    <Tab.Screen name="Communities" component={CommunityView} />
    <Tab.Screen name="Joined Communities" component={JoinedCommunities} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const CommunityDetailTabs = () => {
  const route = useRoute();
  const { id } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={CommunityDetail} initialParams={{ id }} />
      <Tab.Screen name="Posts" component={Posts} initialParams={{ id }} />
      <Tab.Screen name="Chat" component={Chat} initialParams={{ id }} />
    </Tab.Navigator>
  );
};
