import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, FlatList, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar'; // Import NavBar

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const ContactsScreen = ({ navigation }) => {
    // State to hold contacts
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('Hello, I need your assistance.');
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Default contact categories
    const priorityContact = {
        name: "Person 01",
        phone: "09123456789", // Example phone number for the priority contact
        type: "priority",
        addedByUser: false
    };

    const disasterHotline = {
        name: "Disaster Hotline",
        phone: "112", // Example hotline number (adjust as necessary)
        type: "hotline",
        addedByUser: false
    };

    const emergencyHotline = {
        name: "Emergency Hotline",
        phone: "911",
        type: "hotline",
        addedByUser: false
    };

    // Add the priority and hotline contacts on initial load
    useEffect(() => {
        setContacts([priorityContact, disasterHotline, emergencyHotline]);
    }, []);

    // Function to add contact
    const addContact = () => {
        if (name && phone) {
            setContacts([ 
                ...contacts, 
                { name, phone, type: 'priority', addedByUser: true }  // Set type to 'priority' for contact person
            ]);
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

    // Function to separate priority and hotline contacts
    const getSortedContacts = () => {
        const priorityContacts = contacts.filter(contact => contact.type === 'priority');
        const hotlineContacts = contacts.filter(contact => contact.type === 'hotline');
        return { priorityContacts, hotlineContacts };
    };

    const { priorityContacts, hotlineContacts } = getSortedContacts();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Contacts</Text>

            {/* Contact Person Section */}
            <Text style={styles.sectionTitle}>Contact Person:</Text>
            <FlatList
                data={priorityContacts}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <Text style={styles.contactName}>
                            {item.name} {item.addedByUser && <Text style={styles.addedByUser}></Text>}
                        </Text>
                        <View style={styles.contactActions}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => makeCall(item.phone)}
                            >
                                <Ionicons name="call" size={width * 0.1} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => sendMessage(item.phone)}
                            >
                                <Ionicons name="chatbubble" size={width * 0.1} color="blue" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Hotline Section */}
            <Text style={styles.sectionTitle}>Hotlines:</Text>
            <FlatList
                data={hotlineContacts}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <View style={styles.contactActions}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => makeCall(item.phone)}
                            >
                                <Ionicons name="call" size={width * 0.1} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => sendMessage(item.phone)}
                            >
                                <Ionicons name="chatbubble" size={width * 0.1} color="blue" />
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

            <NavBar navigation={navigation} /> {/* Add NavBar here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#f5f5f5',
        paddingBottom: 80,  // Adjusted to give space for the navbar
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    sectionTitle: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#333',
    },
    contactCard: {
        backgroundColor: 'white',
        padding: width * 0.06,
        borderRadius: 15,
        marginBottom: 25,
        alignItems: 'center',
    },
    contactName: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',  // Ensure name is centered
        flexWrap: 'wrap',  // Allow name to wrap in case it's too long
        maxWidth: width * 0.8,  // Limit width for longer names
    },
    addedByUser: {
        fontStyle: 'italic',
        color: '#888',
        fontSize: width * 0.05,
    },
    contactActions: {
        flexDirection: 'row',
        marginTop: height * 0.02,  // Add space between name and actions
    },
    iconButton: {
        marginHorizontal: width * 0.08,
        padding: width * 0.03,
    },
    input: {
        height: height * 0.07,
        fontSize: width * 0.06,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: width * 0.06,
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: width * 0.06,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Solid background to dim behind the modal
    },
    modalContainer: {
        width: width * 0.8,
        padding: width * 0.05,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ContactsScreen;
