import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactsScreen = ({ navigation }) => {
    // State to hold contacts
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('Hello, I need your assistance.');
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Default disaster hotline
    const disasterHotline = {
        name: "Disaster Hotline",
        phone: "112", // Example hotline number (adjust as necessary)
    };

    // Add the default disaster hotline to the contact list on initial load
    useEffect(() => {
        setContacts([disasterHotline]);
    }, []);

    // Function to add contact
    const addContact = () => {
        if (name && phone) {
            setContacts([...contacts, { name, phone }]);
            setName('');
            setPhone('');
            setIsModalVisible(false); // Close the modal after adding the contact
        } else {
            Alert.alert('Error', 'Please enter both name and phone number.');
        }
    };

    // Function to make a call
    const makeCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error('Error making call:', err));
    };

    // Function to send a message
    const sendMessage = (phoneNumber) => {
        Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`).catch(err => console.error('Error sending message:', err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Contacts</Text>

            {/* Contact List */}
            <FlatList
                data={contacts}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <View style={styles.contactActions}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => makeCall(item.phone)}
                            >
                                <Ionicons name="call" size={50} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => sendMessage(item.phone)}
                            >
                                <Ionicons name="chatbubble" size={50} color="blue" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Add New Contact Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Contact</Text>
            </TouchableOpacity>

            {/* Modal for Adding New Contact */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Contact</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity style={styles.addButton} onPress={addContact}>
                            <Text style={styles.addButtonText}>Add Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Navigation Bar */}
            <View style={styles.navbarContainer}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeDashboard')}>
                        <Ionicons name="home" size={40} color="orange" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MedicineTracker')}>
                        <Ionicons name="heart" size={40} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactsScreen')}>
                        <Ionicons name="call" size={40} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingBottom: 80,  // Adjusted to give space for the navbar
    },
    title: {
        bottom:-20,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 55,
        fontSize: 22,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 22,
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 22,
    },
    contactCard: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    contactActions: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 30,
        padding: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 15,
        width: '80%',
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderTopColor: '#ccc',
        paddingVertical: 15,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default ContactsScreen;
