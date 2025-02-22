import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width, height } = Dimensions.get('window');

const TutorialScreen = ({ visible, onClose }) => {
    const navigation = useNavigation(); // Initialize navigation

    // Function to handle "Got it!" button press
    const handleGotItPress = () => {
        onClose(); // Close the modal
        navigation.navigate('Home'); // Navigate to the Home Dashboard
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        {/* Existing Pages */}
                        <View style={styles.page}>
                            <Text style={styles.title}>Welcome to the Tutorial!</Text>
                            <Text style={styles.text}>
                                This app is designed to help you easily manage your health and easily contact your emergency person.
                            </Text>
                            {/*<Image source={require('../assets/images/tutorial1.png')} style={styles.image} />*/}
                        </View>
                        <View style={styles.page}>
                            <Text style={styles.title}>Profile Section</Text>
                            <Text style={styles.text}>
                                Use the profile section to upload your picture and see your name.
                            </Text>
                            <Image source={require('../assets/images/profiletut.jpg')} style={styles.image} />
                        </View>
                        <View style={styles.page}>
                            <Text style={styles.title}>Weather Updates</Text>
                            <Text style={styles.text}>
                                Check the weather updates to stay informed about the current conditions.
                            </Text>
                            <Image source={require('../assets/images/weathertut.jpg')} style={styles.image} />
                        </View>
                        <View style={styles.page}>
                            <Text style={styles.title}>Map Feature</Text>
                            <Text style={styles.text}>
                                Use the map feature to track your location and navigate easily.
                            </Text>
                            <Image source={require('../assets/images/maptut.jpg')} style={styles.image} />
                        </View>

                        {/* New Page: Medicine Tracker Tutorial */}
                        <View style={styles.page}>
                            <Text style={styles.title}>Medicine Tracker</Text>
                            <Text style={styles.text}>
                                Use the medicine tracker to set reminders for your medications and track your dosage.
                            </Text>
                            <Image source={require('../assets/images/medtrack.jpg')} style={styles.image} />
                        </View>

                        {/* New Page: Contacts Tutorial */}
                        <View style={styles.page}>
                            <Text style={styles.title}>Emergency Contacts</Text>
                            <Text style={styles.text}>
                                Add and manage your emergency contacts to quickly reach out in case of an emergency.
                            </Text>
                            <Image source={require('../assets/images/contactstut.jpg')} style={styles.image} />
                        </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.skipButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gotItButton} onPress={handleGotItPress}>
                            <Text style={styles.buttonText}>Got it!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.9, // 90% of screen width
        height: height * 0.8, // 80% of screen height
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    scrollContainer: {
        flexGrow: 1, // Allow ScrollView to take up available space
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    page: {
        width: width * 0.9 - 40, // Adjust width to fit within modal container
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: width * 0.9 - 40, // Match the width of the page
        height: 250, // Fixed height for the image
        resizeMode: 'contain', // Ensure the image fits within the container without cropping
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-between', // Space between buttons
        marginTop: 20, // Add some margin for spacing
        width: '100%', // Take full width of the modal
        paddingHorizontal: 20, // Add horizontal padding
    },
    skipButton: {
        backgroundColor: '#FF6347', // Red color for skip button
        paddingVertical: 15, // Increase vertical padding
        paddingHorizontal: 30, // Increase horizontal padding
        borderRadius: 10, // Rounded corners
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        flex: 1, // Take equal space
        marginRight: 10, // Add margin between buttons
    },
    gotItButton: {
        backgroundColor: '#4CAF50', // Green color for Got it button
        paddingVertical: 15, // Increase vertical padding
        paddingHorizontal: 30, // Increase horizontal padding
        borderRadius: 10, // Rounded corners
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        flex: 1, // Take equal space
        marginLeft: 10, // Add margin between buttons
    },
    buttonText: {
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold text
        color: 'white', // White text for contrast
    },
});

export default TutorialScreen;