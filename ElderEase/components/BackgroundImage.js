import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BackgroundImage = ({ children }) => {
    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')} // Replace with your image path
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
});

export default BackgroundImage; 