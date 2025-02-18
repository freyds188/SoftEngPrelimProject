import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, KeyboardAvoidingView, Platform, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import NavBar from '../components/NavBar';

const MedicineTracker = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [medicineName, setMedicineName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState('');
    const [isTimeValid, setIsTimeValid] = useState(true);
    const [scheduleList, setScheduleList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddSchedule = () => {
        if (!selectedDate || !medicineName || !dosage || !time) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!moment(time, 'hh:mm A', true).isValid()) {
            setIsTimeValid(false);
            return;
        }

        const newSchedule = {
            id: Math.random().toString(),
            date: selectedDate,
            medicineName,
            dosage,
            time,
        };
        setScheduleList((prevSchedules) => [...prevSchedules, newSchedule]);

        Alert.alert('Medicine Schedule Added', `You have scheduled ${medicineName} for ${time} on ${selectedDate}`);

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
        <ImageBackground
                    source={require('../assets/images/background.jpg')} 
                    style={styles.backgroundImage}
                    resizeMode="cover" 
                >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <Text style={styles.header}>Medicine Tracker</Text>

                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: 'orange', selectedTextColor: 'white' },
                    }}
                    theme={{
                        selectedDayBackgroundColor: 'orange',
                        selectedDayTextColor: 'white',
                    }}
                />

                <View style={styles.scheduleListContainer}>
                    <Text style={styles.scheduleListHeader}>Scheduled Medicines</Text>
                    <FlatList data={scheduleList} renderItem={renderScheduleItem} keyExtractor={(item) => item.id} />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={40} color="white" />
                </TouchableOpacity>

                <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeader}>Add Medicine Schedule</Text>

                            <Text style={styles.label}>Medicine Name</Text>
                            <TextInput style={styles.input} placeholder="Enter medicine name" value={medicineName} onChangeText={setMedicineName} />

                            <Text style={styles.label}>Dosage</Text>
                            <TextInput style={styles.input} placeholder="Enter dosage (e.g., 2 tablets)" value={dosage} onChangeText={setDosage} />

                            <Text style={styles.label}>Time</Text>
                            <TextInput
                                style={[styles.input, !isTimeValid && styles.invalidInput]}
                                placeholder="Enter time (e.g., 08:30 AM)"
                                value={time}
                                onChangeText={(input) => {
                                    setTime(input);
                                    setIsTimeValid(true);
                                }}
                            />
                            {!isTimeValid && <Text style={styles.errorText}>Invalid time format. Please use hh:mm AM/PM.</Text>}

                            <TouchableOpacity style={styles.button} onPress={handleAddSchedule}>
                                <Text style={styles.buttonText}>Add Schedule</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <NavBar navigation={navigation} />
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 80% opacity
    },
    header: {
        bottom: -20,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    scheduleListContainer: {
        marginTop: 20,
        paddingBottom: 80,
    },
    scheduleListHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    scheduleItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 70% opacity
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    scheduleText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    addButton: {
        position: 'absolute',
        bottom: 140,
        right: 30,
        backgroundColor: 'orange',
        borderRadius: 200,
        padding: 30,
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
        padding: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // 90% opacity
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'center',
        width: '100%',
        fontSize: 18,
    },
    invalidInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
});

export default MedicineTracker;
