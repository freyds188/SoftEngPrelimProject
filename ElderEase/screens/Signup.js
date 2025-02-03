import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Simulate successful sign up and navigate to login
  const handleSignUp = () => {
    // Here you can add logic to save user data (e.g., API call)
    // After successful sign-up, navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          {/* Debugging Button for Navigation */}
          <TouchableOpacity 
            style={styles.debugButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.debugButtonText}>Go to Login (Debug)</Text>
          </TouchableOpacity>

          <View style={styles.lightsContainer}>
            <Image style={styles.lightLarge} source={require('../assets/images/light.png')} />
            <Image style={styles.lightSmall} source={require('../assets/images/light.png')} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Sign Up</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Gender Selection */}
              <TouchableOpacity 
                style={styles.inputContainer} 
                onPress={() => setModalVisible(true)}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Gender"
                  placeholderTextColor="#999"
                  value={gender || 'Select Gender'}
                  editable={false}
                />
              </TouchableOpacity>

              {/* Gender Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Select Gender</Text>
                  <TouchableOpacity onPress={() => { setGender('Male'); setModalVisible(false); }}>
                    <Text style={styles.modalOption}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setGender('Female'); setModalVisible(false); }}>
                    <Text style={styles.modalOption}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setGender('Other'); setModalVisible(false); }}>
                    <Text style={styles.modalOption}>Other</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalCloseButton} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              {/* Age Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              {/* Mobile Number Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                />
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
  },
  lightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '100%',
  },
  lightLarge: {
    height: 225,
    width: 90,
  },
  lightSmall: {
    height: 160,
    width: 65,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 160,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: 1,
  },
  formContainer: {
    marginHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUp;
