import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';  // Correct import path
import SignUp from './screens/Signup'; // Correct import path
import HomeDashboard from './screens/HomeDashboard';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeDashboard" component={HomeDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
