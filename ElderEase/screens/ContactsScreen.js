import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Linking,
    FlatList,
    Modal,
    Dimensions,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const ContactsScreen = ({ navigation }) => {
    // State to hold contacts
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("Hello, I need your assistance.");
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Handle closing the modal
    const closeModal = async () => {
        setIsModalVisible(false);
        await AsyncStorage.setItem("hasSeenIntro", "true"); // Set flag in AsyncStorage
    };

    // Handle menu options
    const handleHelp = () => {
        setIsMenuVisible(false);
        navigation.navigate("TutorialScreen"); // Navigate to a tutorial screen
    };

    const handleLogout = async () => {
        setIsMenuVisible(false);
        await AsyncStorage.removeItem("userName"); // Clear user name
        await AsyncStorage.removeItem("hasSeenIntro"); // Clear intro status
        await AsyncStorage.removeItem(`profileImage_${registeredUserName}`); // Fix template literal syntax
        navigation.navigate("Login"); // Navigate to login screen
    };

    const handleAboutDevTeam = () => {
        setIsMenuVisible(false);
        navigation.navigate("AboutDevTeamScreen"); // Navigate to about dev team screen
    };

    // Default contact categories
    const priorityContact = {
        name: "Person 01",
        phone: "09123456789", // Example phone number for the priority contact
        type: "priority",
        addedByUser: false,
    };

    const disasterHotline = {
        name: "Disaster Hotline",
        phone: "(049) 508 1149", // Example hotline number (adjust as necessary)
        type: "hotline",
        addedByUser: false,
    };

    const emergencyHotline = {
        name: "Emergency Hotline",
        phone: "911",
        type: "hotline",
        addedByUser: false,
    };
    const pnpCabuyao = {
        name: "PNP Cabuyao",
        phone: "0949 7456 048",
        type: "hotline",
        addedByUser: false,
    };

    const bfp = {
        name: "BFP",
        phone: "0932 7411 457",
        type: "hotline",
        addedByUser: false,
    };

    const meralcoHotline = {
        name: "Meralco Hotline",
        phone: "(02) 16211",
        type: "hotline",
        addedByUser: false,
    };

    const lagunaWater = {
        name: "Laguna Water",
        phone: "0998 559 2306",
        type: "hotline",
        addedByUser: false,
    };

    // Add the priority and hotline contacts on initial load
    useEffect(() => {
        const loadContacts = async () => {
            const storedContacts = await AsyncStorage.getItem("contacts");
            if (storedContacts) {
                setContacts(JSON.parse(storedContacts));
            } else {
                setContacts([
                    priorityContact,
                    disasterHotline,
                    emergencyHotline,
                    pnpCabuyao,
                    bfp,
                    meralcoHotline,
                    lagunaWater,
                ]);
            }
        };

        loadContacts();
    }, []);

    // Function to add contact
    const addContact = async () => {
        if (name && phone) {
            const newContact = { name, phone, type: "priority", addedByUser: true };
            const updatedContacts = [...contacts, newContact];
            setContacts(updatedContacts);
            await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts)); // Store updated contacts
            setName("");
            setPhone("");
            setIsModalVisible(false); // Close the modal after adding the contact
        } else {
            Alert.alert("Error", "Please enter both name and phone number.");
        }
    };

    // Function to make a call
    const makeCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`).catch((err) => // Fix template literal syntax
            console.error("Error making call:", err)
        );
    };

    // Function to send a message
    const sendMessage = (phoneNumber) => {
        Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`).catch((err) => // Fix template literal syntax
            console.error("Error sending message:", err)
        );
    };

    // Function to separate priority and hotline contacts
    const getSortedContacts = () => {
        const priorityContacts = contacts.filter(
            (contact) => contact.type === "priority"
        );
        const hotlineContacts = contacts.filter(
            (contact) => contact.type === "hotline"
        );
        return { priorityContacts, hotlineContacts };
    };

    const { priorityContacts, hotlineContacts } = getSortedContacts();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Contacts</Text>
            {/* Contact Person Section */}
      // Inside your component return block
            {/* Contact Person Section */}
            <Text style={styles.sectionTitle}>
                Contact Person:{" "}
                <Text style={styles.counterText}>({priorityContacts.length})</Text>
            </Text>


            <FlatList
                data={priorityContacts}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <Text style={styles.contactName}>
                            {item.name}{" "}
                            {item.addedByUser && <Text style={styles.addedByUser}></Text>}
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
                style={styles.contactList}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => <View style={{ height: height * 0.05 }} />}
            />

            {/* Hotline Section */}
            <Text style={styles.sectionTitle}>
                <Ionicons name="arrow-back" size={30} color="red" />
                Hotlines
                <Ionicons name="arrow-forward" size={30} color="red" />
            </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
            >
                {hotlineContacts.map((item, index) => (
                    <View key={index} style={styles.contactCard}>
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
                ))}
            </ScrollView>
            {/* Add New Contact Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
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
           
            <NavBar navigation={navigation} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: "#f0f4f8", // Light grayish-blue for a calm vibe
        paddingBottom: 80,
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#3b3f42", // Dark gray for a subtle, clean look
    },
    sectionTitle: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        marginTop: 30,
        color: "#3b3f42", // Dark gray for consistency
    },
    contactCard: {
        backgroundColor: "#ffffff", // White for clean, minimal aesthetic
        padding: width * 0.06,
        borderRadius: 15,
        marginBottom: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Softer shadow for a lighter feel
        shadowRadius: 5,
        elevation: 3, // Lower elevation for a subtler 3D effect
        borderWidth: 1, // Soft border
        borderColor: "#d1d5db", // Light gray border
    },
    contactName: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        color: "#4a4a4a", // Muted dark gray for text
        textAlign: "center",
        flexWrap: "wrap",
        maxWidth: width * 0.8,
    },
    addedByUser: {
        fontStyle: "italic",
        color: "#a0a0a0", // Light gray for added by user text
        fontSize: width * 0.05,
    },
    contactActions: {
        flexDirection: "row",
        marginTop: height * 0.02,
    },
    iconButton: {
        marginHorizontal: width * 0.08,
        padding: width * 0.03,
    },
    input: {
        height: height * 0.07,
        fontSize: width * 0.06,
        borderColor: "#d1d5db", // Light gray border
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: height * 0.02,
        paddingLeft: 10,
        backgroundColor: "#ffffff", // White background for input
    },
    addButton: {
        backgroundColor: "#6c757d", // Muted gray for buttons (chill vibe)
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    addButtonText: {
        fontSize: width * 0.06,
        color: "#ffffff", // White text
    },
    cancelButton: {
        backgroundColor: "#e0e0e0", // Soft gray for cancel button
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        fontSize: width * 0.06,
        color: "#4a4a4a", // Dark gray for cancel text
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black for the overlay
    },
    modalContainer: {
        backgroundColor: "#ffffff", // White background for modal
        padding: width * 0.05,
        borderRadius: 10,
        width: width * 0.8,
    },
    modalTitle: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        marginBottom: height * 0.02,
        color: "#3b3f42", // Dark gray for modal title
    },
    navbarContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
        backgroundColor: "#ffffff", // White navbar background
        borderTopWidth: 1,
        borderColor: "#d1d5db", // Light gray border at the top of navbar
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
    scrollContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    contactList: {
        maxHeight: height * 0.4,
        flexGrow: 0,
        marginTop: height * 0.02,
    },
    sectionTitle: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        marginTop: 30,
        color: "#3b3f42", // Dark gray for section title
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#d1d5db", // Light gray border for section title
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#f7f7f7", // Soft light background color
    },

});

export default ContactsScreen;