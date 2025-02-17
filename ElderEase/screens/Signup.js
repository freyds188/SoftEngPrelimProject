import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    // Input validation
    if (!name || !gender || !age || !mobile || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (isNaN(age) || age < 1 || age > 120) {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }

    if (mobile.length < 10 || isNaN(mobile)) {
      Alert.alert('Error', 'Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    console.log('Registration process started');

    try {
      console.log('Sending registration request...');
      const response = await fetch('http://192.168.18.56:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender,
          age,
          mobile,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('Response received:', data);

      if (response.ok) {
        console.log('Registration successful');
        try {
          await AsyncStorage.setItem('userName', name); // Store the name
          console.log('Stored user name in AsyncStorage:', name);
        } catch (error) {
          console.error('Error storing user name in AsyncStorage:', error);
        }
        setTermsModalVisible(true);
      } else {
        console.log('Registration failed:', data.message);
        Alert.alert('Registration Failed', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Registration Failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeToTerms = () => {
    setTermsModalVisible(false);
    Alert.alert('Thank you for agreeing to the terms!');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.debugButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.debugButtonText}>Login</Text>
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

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

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <View style={styles.modalBackdrop}>
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
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setTermsModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <ScrollView style={styles.termsScrollView}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our terms and conditions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleAgreeToTerms}
              >
                <Text style={styles.modalCloseButtonText}>I Agree</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
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
  termsScrollView: {
    maxHeight: 200,
    marginVertical: 10,
  },
  termsText: {
    textAlign: 'center',
  },
});

export default SignUp;