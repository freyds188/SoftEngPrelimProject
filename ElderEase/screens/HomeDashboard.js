import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const HomeDashboard = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');

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

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.uploadIconContainer}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.greeting}>Hello, Alby Pisot</Text>
      
      </View>
      
      {/* Weather and Map Widgets */}
      <View style={styles.widgetContainer}>
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Cabuyao City</Text>
          <Text style={styles.widgetTemp}>23°</Text>
          <Text style={styles.widgetDescription}>Cloudy</Text>
        </View>
        <View style={styles.widget}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.mapImage} />
        </View>
      </View>
      
      {/* Medicine Reminder */}
      <View style={styles.medicineContainer}>
        <Text style={styles.medicineTitle}>Medicine</Text>
        <Text style={styles.medicineDescription}>Description</Text>
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <Ionicons name="home" size={32} color="orange" />
          <Ionicons name="heart" size={32} color="red" />
          <Ionicons name="call" size={32} color="green" />
        </View>
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
    padding: 100,
    borderRadius: 20,
    marginBottom: 20,
    position: 'relative',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    padding: 30,
  },
  greeting: {
    right: 30,
    fontSize: 40,
    fontWeight: 'bold',
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  widget: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  widgetTemp: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  widgetDescription: {
    fontSize: 16,
    color: 'gray',
  },
  mapImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  medicineContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  medicineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  medicineDescription: {
    fontSize: 16,
    color: 'gray',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default HomeDashboard;