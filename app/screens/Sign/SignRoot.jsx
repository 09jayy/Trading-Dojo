import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

const Tab = createBottomTabNavigator(); 

export const SignRoot = () => {
    return (
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
    ); 
}