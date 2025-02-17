import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';

const WeatherScreen = ({ route }) => {
    const { city } = route.params;
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = '2960c45ce4594eec984215930251702'; 
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`;

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city) {
                setError(new Error("City name is required"));
                setLoading(false);
                return;
            }

            try {
                // Fetch current weather
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.location && data.current) {
                    setWeather(data);

                    // Fetch 5-day forecast
                    const forecastResponse = await fetch(FORECAST_URL);
                    const forecastData = await forecastResponse.json();

                    if (forecastData.forecast?.forecastday) {
                        setForecast(forecastData.forecast.forecastday);
                    } else {
                        setError(new Error("Forecast data not available"));
                    }
                } else {
                    setError(new Error(data.error?.message));
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.city}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.city}>Error: {error.message}</Text>
            </View>
        );
    }

    if (!weather) {
        return (
            <View style={styles.container}>
                <Text style={styles.city}>No weather data available.</Text>
            </View>
        );
    }

    // Header component for FlatList
    const renderHeader = () => (
        <View>
            <Text style={styles.city}>{weather.location.name}</Text>
            <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
            <Text style={styles.description}>{weather.current.condition.text}</Text>

            {/* Additional Weather Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Humidity: {weather.current.humidity}%</Text>
                <Text style={styles.detail}>Wind: {weather.current.wind_kph} kph</Text>
                <Text style={styles.detail}>Feels Like: {weather.current.feelslike_c}°C</Text>
            </View>

            <Text style={styles.forecastTitle}>5-Day Forecast</Text>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/images/weatherbg.jpg')} 
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <FlatList
                data={forecast}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        <Text style={styles.forecastDate}>{item.date}</Text>
                        <Text style={styles.forecastTemp}>{item.day.avgtemp_c}°C</Text>
                        <Text style={styles.forecastDescription}>{item.day.condition.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.date}
                contentContainerStyle={styles.container}
            />
            <NavBar navigation={navigation} /> {/* Add NavBar here */}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    city: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black', 
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        padding: 10,
        borderRadius: 10,
    },
    temp: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'black', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 20,
        color: 'black', 
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        padding: 10,
        borderRadius: 10,
    },
    detailsContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        borderRadius: 15,
    },
    detail: {
        fontSize: 18,
        color: 'black', 
        marginBottom: 10,
    },
    forecastTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', 
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        padding: 10,
        borderRadius: 10,
    },
    forecastItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    forecastDate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', 
    },
    forecastTemp: {
        fontSize: 16,
        color: 'black', 
    },
    forecastDescription: {
        fontSize: 14,
        color: 'black', 
    },
});

export default WeatherScreen;