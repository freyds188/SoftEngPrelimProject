import * as React from 'react';
import { useState } from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login'; 
import SignUp from './screens/Signup'; 
import HomeDashboard from './screens/HomeDashboard';
import WeatherScreen from './screens/WeatherScreen';
import MedicineTracker from './screens/MedicineTracker';
import ContactsScreen from './screens/ContactsScreen'; 
import TutorialScreen from './screens/TutorialScreen';
import AboutDevTeamScreen from './screens/AboutDevTeamScreen'; 

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Main App component
export default function App() {
    const [isTutorialVisible, setTutorialVisible] = useState(false); // State for modal visibility

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="HomeDashboard">
                    {(props) => (
                        <HomeDashboard
                            {...props}
                            openTutorial={() => setTutorialVisible(true)} // Pass function to open modal
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
                <Stack.Screen name="MedicineTracker" component={MedicineTracker} />
                <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
                <Stack.Screen name="AboutDevTeamScreen" component={AboutDevTeamScreen} />
            </Stack.Navigator>

            {/* Render TutorialScreen as a modal */}
            <TutorialScreen
                visible={isTutorialVisible}
                onClose={() => setTutorialVisible(false)} // Pass function to close modal
            />
        </NavigationContainer>
    );
}