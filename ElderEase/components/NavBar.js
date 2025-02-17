import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavBar = ({ navigation }) => {
    return (
        <View style={styles.navbarContainer}>
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
    );
};

const styles = {
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25,
    },
};

export default NavBar;