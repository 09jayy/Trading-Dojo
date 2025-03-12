import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SignRoot } from './screens/Sign/SignRoot';

export default function App() {
  return (
    <NavigationContainer>
      <SignRoot/>
    </NavigationContainer>
  );
}
