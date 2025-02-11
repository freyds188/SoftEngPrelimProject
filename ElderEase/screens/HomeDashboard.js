import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Button, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker from react-native-maps
import * as Location from 'expo-location'; // Import expo-location to access the user's location

const HomeDashboard = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
    const [weather, setWeather] = useState({
        city: 'Cabuyao City',
        temp: 'Loading...',
        description: 'Loading...',
        humidity: '--',
        windSpeed: '--',
        feelsLike: '--',
        icon: '01d',
    });
    const [location, setLocation] = useState(null); // To store the user's location
    const [errorMsg, setErrorMsg] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility state

    const API_KEY = '8a2d7b4762f1e944878db3dc8463ea6e';

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=Cabuyao,PH&units=metric&appid=${API_KEY}`
                );
                const data = await response.json();

                setWeather({
                    city: data.name,
                    temp: `${Math.round(data.main.temp)}°C`,
                    description: data.weather[0].description,
                    humidity: `${data.main.humidity}%`,
                    windSpeed: `${data.wind.speed} m/s`,
                    feelsLike: `${Math.round(data.main.feels_like)}°C`,
                    icon: data.weather[0].icon,
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeather({ city: 'Error', temp: '--', description: 'Unable to fetch weather' });
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const getWeatherIconUrl = () => {
        return `http://openweathermap.org/img/wn/${weather.icon}.png`;
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
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Open the terms and conditions link
    const openTermsAndConditions = () => {
        Linking.openURL('https://www.yourwebsite.com/terms-and-conditions'); // Replace with your URL
    };

    return (
        <View style={styles.container}>
            {/* Modal for Introduction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Welcome to Your Personalized Dashboard App!</Text>
                        <Text style={styles.modalText}>
                            This app is designed to offer you a seamless and user-friendly experience, putting everything you need in one place.
                            Whether you're looking to track the weather, manage your personal health, or stay connected with loved ones, this app has you covered.
                        </Text>
                        <Button title="Got it!" onPress={closeModal} />
                    </View>
                </View>
            </Modal>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <View style={styles.uploadIconContainer}>
                        <Ionicons name="camera" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.greeting}>Hello, Aldrin</Text>
            </View>

            {/* Weather and Map Widgets */}
            <View style={styles.widgetContainer}>
                <TouchableOpacity
                    style={styles.weatherContainer}
                    onPress={() => navigation.navigate('WeatherScreen', { weather })}
                >
                    <LinearGradient
                        colors={['#021526', '#03346E']}
                        style={styles.gradientOverlay}
                    >
                        <View style={styles.weatherWidget}>
                            <Text style={styles.widgetTitle}>{weather.city}</Text>
                            <Image source={{ uri: getWeatherIconUrl() }} style={styles.weatherIcon} />
                            <Text style={styles.widgetTemp}>{weather.temp}</Text>
                            <Text style={styles.widgetDescription}>{weather.description}</Text>
                            <View style={styles.weatherDetails}>
                                <Text style={styles.detailsText}>Humidity: {weather.humidity}</Text>
                                <Text style={styles.detailsText}>Wind Speed: {weather.windSpeed}</Text>
                                <Text style={styles.detailsText}>Feels Like: {weather.feelsLike}</Text>
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
                    <Text>{errorMsg ? errorMsg : 'Loading location...'}</Text>
                )}
            </View>

            {/* Bottom Navigation */}
            <View style={styles.navbarContainer}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeDashboard')}>
                        <Ionicons name="home" size={32} color="orange" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MedicineTracker')}>
                        <Ionicons name="heart" size={32} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactsScreen')}>
                        <Ionicons name="call" size={32} color="green" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Terms and Agreement Section */}
            <View style={styles.termsContainer}>
                <TouchableOpacity onPress={openTermsAndConditions}>
                    <Text style={styles.termsText}>Terms and Conditions</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
        backgroundColor: 'white',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25,
        backgroundColor: 'white',
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
    termsContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 30,
    },
    termsText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default HomeDashboard;
