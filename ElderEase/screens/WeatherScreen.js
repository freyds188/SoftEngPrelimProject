import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WeatherScreen = ({ route }) => {
  const { city } = route.params;  // Assuming 'city' is passed from the previous screen
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a2d7b4762f1e944878db3dc8463ea6e&units=metric`
        );
        const data = await response.json();
        setWeather(data);
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main?.temp}°C</Text>
      <Text style={styles.description}>{weather.weather?.[0]?.description}</Text>

      {/* Additional Weather Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Humidity: {weather.main?.humidity}%</Text>
        <Text style={styles.detail}>Wind: {weather.wind?.speed} m/s</Text>
        <Text style={styles.detail}>Feels Like: {weather.main?.feels_like}°C</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    padding: 20,
  },
  city: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  temp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
  detail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});

export default WeatherScreen;
