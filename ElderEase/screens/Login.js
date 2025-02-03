import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <View style={styles.lightsContainer}>
            <Image style={styles.lightLarge} source={require('../assets/images/light.png')} />
            <Image style={styles.lightSmall} source={require('../assets/images/light.png')} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Login</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.signupButtonText}>Don't have an account? Sign Up</Text>
              </TouchableOpacity>

              {/* Development Button to go to Home Dashboard */}
              <TouchableOpacity
                style={styles.devButton}
                onPress={() => navigation.navigate('HomeDashboard')}
              >
                <Text style={styles.devButtonText}>Go to Dashboard</Text>
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
  signupButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  devButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  devButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
