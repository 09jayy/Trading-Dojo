import { use, useEffect, useState} from 'react';
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
import { StockPage } from './screens/StockMarket/StockPage';
import {CommunityDetail} from './screens/Community/CommunityDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Posts } from './screens/Community/CommunityPages/Posts';
import { Chat } from './screens/Community/CommunityPages/Chat';
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './components/Config/firebaseConfig'; 
import { LeaderView } from './screens/Community/LeaderCommunity'; 
import { LeaderJoined } from './screens/Community/LeaderJoined';
import { LeaderPosts } from './screens/Community/CommunityPages/LeaderPosts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [uid, setUid] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const userParse = JSON.parse(user);
        if (user) {
          setSignedIn(true);
          setUid(userParse.uid)
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

  useEffect(() => {
    const fetchUserRole = async () => {
        const userId = uid
        const userRef = doc(db, 'users', userId); // users collection, document = UID
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        setRole(data.role); 
        console.log("User role fetched:", data.role);
      };
      fetchUserRole();
    }, [uid]);
  
  return (
    <signedInContext.Provider value={{ signedIn, setSignedIn }}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent={true} />

      <NavigationContainer>
        {signedIn ? (
          <Stack.Navigator>
            {/* Tabs for signed-in users */}
            <Stack.Screen
              name="MainTabs"
              component={role === 'leader' ? LeaderTabs : MainTabs}
              options={{ headerShown: false }}
            />
            {/* Glossary is outside the tabs */}
            <Stack.Screen
              name="Glossary"
              component={Glossary}
              options={{ title: 'Glossary', fullScreenGestureEnabled: true }}
            />
            {/* Stock Page is outside the tabs */}
             <Stack.Screen 
             name="StockPage" 
             component={StockPage} 
             options={{ title: 'Stock Page' }}/>
            <Stack.Screen
            name="CommunityDetailTabs"
            component={CommunityDetailTabs}
            options={{ title: "", gestureEnabled: true }}
            initialParams={{role}}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Tabs for Sign In / Sign Up */}
            <Stack.Screen name="AuthTabs" component={AuthTabs} />
          </Stack.Navigator>
        )}
        <Toast/>
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
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: true,
      tabBarIcon: ({color, size}) => {
        let iconName; 
        switch (route.name) {
          case 'Investments':
            iconName = 'attach-money';
            break;
          case 'Stock Market':
            iconName = 'shopping-basket';
            break; 
          case 'Communities':
            iconName='people';
            break; 
          case 'Joined Communities':
            iconName = 'house';
            break; 
          case 'Profile': 
            iconName = 'person';
            break; 
          default:
            iconName = 'check-box-outline-blank'
            break; 
        }
        return <MaterialIcons name={iconName} size={size} color={color} />
      }
    })}
  >
    <Tab.Screen name="Investments" component={Dashboard} />
    <Tab.Screen name="Stock Market" component={StockMarket} />
    <Tab.Screen name="Communities" component={CommunityView} />
    <Tab.Screen name="Joined Communities" component={JoinedCommunities} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const CommunityDetailTabs = () => {
  const route = useRoute();
  const { role, id } = route.params;

  const [isCreator, setIsCreator] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const uid = user.uid;
        setUid(uid);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }
  , []);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communityRef = doc(db, 'Communities', id);
        const communitySnap = await getDoc(communityRef);
        const data = communitySnap.data();
        if (data.createdBy === uid) {
          setIsCreator(true);
        }
      } catch (error) {
        console.error("Error fetching community data: ", error);
      }
    };
    fetchCommunityData();
  }, [uid, id]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={CommunityDetail} initialParams={{ id }} />
      <Tab.Screen name="Posts" component={role === 'leader' && isCreator? LeaderPosts : Posts} initialParams={{ id }} />
      <Tab.Screen name="Chat" component={Chat} initialParams={{ id }} />
    </Tab.Navigator>
  );
};

const LeaderTabs = () => {
  return (
    <Tab.Navigator
     screenOptions={({route}) => ({
      headerShown: true,
      tabBarIcon: ({color, size}) => {
        let iconName; 
        switch (route.name) {
          case 'Communities':
            iconName='people';
            break; 
          case 'Joined Communities':
            iconName = 'house';
            break; 
          case 'Profile': 
            iconName = 'person';
            break; 
          default:
            iconName = 'check-box-outline-blank'
            break; 
        }
        return <MaterialIcons name={iconName} size={size} color={color} />
      }
    })}>
      <Tab.Screen name="Communities" component={LeaderView} />
      <Tab.Screen name="Joined Communities" component={LeaderJoined} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
