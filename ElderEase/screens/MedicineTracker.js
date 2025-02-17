import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // Import moment for time formatting
import NavBar from '../components/NavBar'; // Import NavBar

const MedicineTracker = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [medicineName, setMedicineName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState(''); // Store time as a string
    const [isTimeValid, setIsTimeValid] = useState(true); // Track time validity
    const [scheduleList, setScheduleList] = useState([]); // Store list of scheduled medicines
    const [modalVisible, setModalVisible] = useState(false); // Track modal visibility

    const handleAddSchedule = () => {
        if (!selectedDate || !medicineName || !dosage || !time) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Validate time input
        if (!moment(time, 'hh:mm A', true).isValid()) {
            setIsTimeValid(false);
            return;
        }

        // Add schedule to list
        const newSchedule = {
            id: Math.random().toString(), // Generate unique ID
            date: selectedDate,
            medicineName,
            dosage,
            time,
        };
        setScheduleList((prevSchedules) => [...prevSchedules, newSchedule]);

        Alert.alert('Medicine Schedule Added', `You have scheduled ${medicineName} for ${time} on ${selectedDate}`);

        // Reset form fields and close modal
        setMedicineName('');
        setDosage('');
        setTime('');
        setModalVisible(false);
    };

    const renderScheduleItem = ({ item }) => (
        <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>Medicine: {item.medicineName}</Text>
            <Text style={styles.scheduleText}>Dosage: {item.dosage}</Text>
            <Text style={styles.scheduleText}>Time: {item.time}</Text>
            <Text style={styles.scheduleText}>Date: {item.date}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.header}>Medicine Tracker</Text>

            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: 'orange',
                        selectedTextColor: 'white',
                    },
                }}
                theme={{
                    selectedDayBackgroundColor: 'orange',
                    selectedDayTextColor: 'white',
                }}
            />

            <View style={styles.scheduleListContainer}>
                <Text style={styles.scheduleListHeader}>Scheduled Medicines</Text>
                <FlatList
                    data={scheduleList}
                    renderItem={renderScheduleItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            {/* Plus icon to open the form modal */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={40} color="white" />
            </TouchableOpacity>

            {/* Modal for adding medicine schedule */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Add Medicine Schedule</Text>

                        <Text style={styles.label}>Medicine Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter medicine name"
                            value={medicineName}
                            onChangeText={setMedicineName}
                        />

                        <Text style={styles.label}>Dosage</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter dosage (e.g., 2 tablets)"
                            value={dosage}
                            onChangeText={setDosage}
                        />

                        <Text style={styles.label}>Time</Text>
                        <TextInput
                            style={[styles.input, !isTimeValid && styles.invalidInput]}
                            placeholder="Enter time (e.g., 08:30 AM)"
                            value={time}
                            onChangeText={(input) => {
                                setTime(input);
                                setIsTimeValid(true); // Reset validity when user starts typing
                            }}
                        />
                        {!isTimeValid && <Text style={styles.errorText}>Invalid time format. Please use hh:mm AM/PM.</Text>}

                        <TouchableOpacity style={styles.button} onPress={handleAddSchedule}>
                            <Text style={styles.buttonText}>Add Schedule</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <NavBar navigation={navigation} /> {/* Add NavBar here */}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        bottom: -20,
        fontSize: 28,  // Larger font size for better readability
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',  // Darker color for better contrast
    },
    scheduleListContainer: {
        marginTop: 20,
        paddingBottom: 80, // Add space for the navbar
    },
    scheduleListHeader: {
        fontSize: 22,  // Increased font size
        fontWeight: 'bold',
        marginBottom: 15,  // More space between header and list
        color: '#333',
    },
    scheduleItem: {
        backgroundColor: '#fff',
        padding: 15,  // Increased padding for easier touch interaction
        borderRadius: 5,
        marginBottom: 15,  // More space between items
        borderColor: '#ccc',
        borderWidth: 1,
    },
    scheduleText: {
        fontSize: 16,  // Larger font size for item text
        color: '#333',
        lineHeight: 24, // Better line height for readability
    },
    addButton: {
        position: 'absolute',
        bottom: 140,
        right: 30,
        backgroundColor: 'orange',
        borderRadius: 200,
        padding: 30,  // Larger padding for easier clicking
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 25,  // Increased padding for comfort
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 24,  // Larger header font
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    label: {
        fontSize: 18,  // Larger label font for better clarity
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 50,  // Increased height for easier touch
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20, // Added space between inputs
        paddingLeft: 15,  // Increased padding for easier typing
        borderRadius: 5,
        justifyContent: 'center',
        width: '100%',
        fontSize: 18,  // Larger text size for input
    },
    invalidInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,  // Slightly larger error text
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 20,  // Increased padding for better touch
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,  // Larger text for button
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: 20,  // Increased padding for close button
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25,
        backgroundColor: 'white',
    },
});

export default MedicineTracker;
