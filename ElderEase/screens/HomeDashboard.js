import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Button, Linking, Alert, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePreventRemove from '../hooks/usePreventRemove';
import TutorialScreen from './TutorialScreen';
import NavBar from '../components/NavBar';
import { LogBox } from 'react-native';

const HomeDashboard = ({ navigation }) => {
    LogBox.ignoreAllLogs();
    usePreventRemove();

    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100'); // Default image
    const [registeredUserName, setRegisteredUserName] = useState(''); // State for user name
    const [weather, setWeather] = useState({
        city: 'Cabuyao City',
        temp: 'Loading...',
        description: 'Loading...',
        humidity: '--',
        windSpeed: '--',
        feelsLike: '--',
        icon: '01d',
    });
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(true);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isTutorialVisible, setIsTutorialVisible] = useState(false); // State for tutorial visibility

    const API_KEY = '2960c45ce4594eec984215930251702'; // Your WeatherAPI key
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Cabuyao`;

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.location && data.current) {
                    setWeather({
                        city: data.location.name,
                        temp: `${data.current.temp_c}°C`,
                        description: data.current.condition.text,
                        humidity: `${data.current.humidity}%`,
                        windSpeed: `${data.current.wind_kph} kph`,
                        feelsLike: `${data.current.feelslike_c}°C`,
                        icon: `https:${data.current.condition.icon}`,
                    });
                } else {
                    console.error('Error fetching weather data:', data.error?.message);
                    setWeather({
                        city: 'Error',
                        temp: '--',
                        description: 'Unable to fetch weather',
                        humidity: '--',
                        windSpeed: '--',
                        feelsLike: '--',
                        icon: '01d',
                    });
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeather({
                    city: 'Error',
                    temp: '--',
                    description: 'Unable to fetch weather',
                    humidity: '--',
                    windSpeed: '--',
                    feelsLike: '--',
                    icon: '01d',
                });
            }
        };

        fetchWeather();

        // Request for location permission
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    // Load profile image and user name
    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userName'); // Retrieve user name
                console.log('Retrieved user name from AsyncStorage:', storedName); // Debugging line
                if (storedName) {
                    setRegisteredUserName(storedName); // Set user name

                    // Load profile image for the specific user
                    const storedImage = await AsyncStorage.getItem(`profileImage_${storedName}`);
                    if (storedImage) {
                        setProfileImage(storedImage);
                    }
                } else {
                    console.log('No user name found in AsyncStorage.'); // Log if no user name is found
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
            }
        };

        loadProfileData();
    }, []);

    // Load intro status
    useEffect(() => {
        const loadIntroStatus = async () => {
            const seenIntro = await AsyncStorage.getItem('hasSeenIntro');
            if (seenIntro === 'true') {
                setHasSeenIntro(true);
            }
        };

        loadIntroStatus();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;
            setProfileImage(newImageUri);

            // Save the new profile image for the specific user
            try {
                await AsyncStorage.setItem(`profileImage_${registeredUserName}`, newImageUri);
                console.log('Profile image saved successfully.');
            } catch (error) {
                console.error('Error saving profile image:', error);
            }
        }
    };

    const handleCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url);
    };

    const handleMessage = (phoneNumber) => {
        const message = "Hello, how are you?";
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        Linking.openURL(url);
    };

    // Handle closing the modal
    const closeModal = async () => {
        setIsModalVisible(false);
        await AsyncStorage.setItem('hasSeenIntro', 'true'); // Set flag in AsyncStorage
    };

    const handleLogout = async () => {
        setIsMenuVisible(false);
        await AsyncStorage.removeItem('userName'); // Clear user name
        await AsyncStorage.removeItem('hasSeenIntro'); // Clear intro status
        await AsyncStorage.removeItem(`profileImage_${registeredUserName}`); // Clear profile image
        navigation.navigate('Login'); // Navigate to login screen
    };

    const handleAboutDevTeam = () => {
        setIsMenuVisible(false);
        navigation.navigate('AboutDevTeamScreen'); // Navigate to about dev team screen
    };

    return (
        <ImageBackground
            source={require('../assets/images/wallpaper.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                {/* Menu Button */}
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => setIsMenuVisible(true)}
                >
                    <Ionicons name="menu" size={32} color="black" />
                </TouchableOpacity>

                {/* Menu Modal */}
                <Modal
                    transparent={true}
                    visible={isMenuVisible}
                    onRequestClose={() => setIsMenuVisible(false)}
                >
                    <View style={styles.menuModalContainer}>
                        <View style={styles.menuModalContent}>
                            {/* Logo */}
                            <Image
                                source={require('../assets/images/elderease.png')} // Replace with your logo path
                                style={styles.logo}
                            />
                            <TouchableOpacity onPress={() => { setIsMenuVisible(false); setIsTutorialVisible(true); }} style={styles.menuOption}>
                                <Text style={styles.menuOptionText}>Tutorial</Text> {/* Navigate to Tutorial */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setIsMenuVisible(false); navigation.navigate('AboutDevTeamScreen'); }} style={styles.menuOption}>
    <Text style={styles.menuOptionText}>About Development Team</Text>
</TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout} style={styles.menuOption}>
                                <Text style={styles.menuOptionText}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.menuOption}>
                                <Text style={styles.menuOptionText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Tutorial Modal */}
                <TutorialScreen visible={isTutorialVisible} onClose={() => setIsTutorialVisible(false)} />

                {isModalVisible && !hasSeenIntro && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Welcome to ElderEase!</Text>
                                <Text style={styles.modalText}>
                                    This app is designed to offer you a seamless and user-friendly experience, putting everything you need in one place.
                                    Whether you're looking to track the weather, manage your personal health, or stay connected with loved ones, this app has you covered.
                                </Text>
                                <Button title="Got it!" onPress={closeModal} />
                            </View>
                        </View>
                    </Modal>
                )}

// Profile Section
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                        <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
                        <View style={styles.uploadIconContainer}>
                            <Ionicons name="camera" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.greeting}>Hello, {registeredUserName || 'User'}</Text> {/* Ensure this is wrapped in <Text> */}
                </View>

// Weather and Map Widgets
                <View style={styles.widgetContainer}>
                    <TouchableOpacity
                        style={styles.weatherContainer}
                        onPress={() => navigation.navigate('WeatherScreen', { city: weather.city })} // Pass city to WeatherScreen
                    >
                        <LinearGradient
                            colors={['#021526', '#03346E']}
                            style={styles.gradientOverlay}
                        >
                            <View style={styles.weatherWidget}>
                                <Text style={styles.widgetTitle}>{weather.city}</Text> {/* Ensure this is wrapped in <Text> */}
                                <Image source={{ uri: weather.icon }} style={styles.weatherIcon} />
                                <Text style={styles.widgetTemp}>{weather.temp}</Text> {/* Ensure this is wrapped in <Text> */}
                                <Text style={styles.widgetDescription}>{weather.description}</Text> {/* Ensure this is wrapped in <Text> */}
                                <View style={styles.weatherDetails}>
                                    <Text style={styles.detailsText}>Humidity: {weather.humidity}</Text> {/* Ensure this is wrapped in <Text> */}
                                    <Text style={styles.detailsText}>Wind Speed: {weather.windSpeed}</Text> {/* Ensure this is wrapped in <Text> */}
                                    <Text style={styles.detailsText}>Feels Like: {weather.feelsLike}</Text> {/* Ensure this is wrapped in <Text> */}
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.widget}>
                        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.mapImage} />
                    </View>
                </View>

                {/* GPS Map Tracker */}
                <View style={styles.mapContainer}>
                    {location ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                        </MapView>
                    ) : (
                        <Text style={styles.errorText}>{errorMsg ? errorMsg : 'Loading location...'}</Text>
                    )}
                </View>

                <NavBar navigation={navigation} /> 
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 60,
        borderRadius: 20,
        marginBottom: 20,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        right: 50,
        width: 170,
        height: 170,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#FF6347',
    },
    uploadIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 55,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        padding: 8,
    },
    greeting: {
        right: 40,
        marginLeft: 20,
        fontSize: 50,
        fontWeight: 'bold',
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '143%',
    },
    weatherContainer: {
        flex: 1,
        marginRight: 10,
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    weatherWidget: {
        padding: 20,
        alignItems: 'center',
    },
    widgetTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    widgetTemp: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    widgetDescription: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    weatherDetails: {
        marginTop: 10,
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 14,
        color: 'white',
    },
    weatherIcon: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    mapImage: {
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    mapContainer: {
        height: 250,
        width: '100%',
        marginBottom: 20,
    },
    map: {
        flex: 1,
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        width: 60, // Set a width for the button
        height: 60, // Set a height for the button
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add a background color for better visibility
        borderRadius: 30, // Make it circular
        alignItems: 'center', // Center the icon horizontally
        justifyContent: 'center', // Center the icon vertically
    },
    menuModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    menuModalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    menuOption: {
        paddingVertical: 15,
        width: '300%',
        alignItems: 'center',
    },
    menuOptionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default HomeDashboard;