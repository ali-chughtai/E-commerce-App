// FirebaseAdmin.js

// import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'; // Import Image
import { TextInput } from 'react-native';
import BackButtonScreen from './BackButton';

const FirebaseAdmin = ({navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setRemembered] = useState(false);

  const handleAdminLogin = () => {
  const allowedEmail = 'am6900955@gmail.com';
  const allowedPassword = 'Admin123';
  const allowedEmail2 = 'alichughtai67@gmail.com'
  const allowedPassword2 = 'Admin123';

  if ((email === allowedEmail && password === allowedPassword) || (email === allowedEmail2 && password === allowedPassword2) ) {
    console.log('User signed in successfully!');
    Alert.alert('User signed in successfully!');
    navigation.navigate('View All Products');
  } else {
    console.log('Invalid credentials!');
    Alert.alert('Invalid credentials!');
  }
};

  return (
    
    <View style={styles.container}>
        
      <Text style={styles.headingText}>Admin Login</Text>
      <Text style={styles.subHeadingText}>Login to your admin account</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.rememberMeContainer}>
        {/* <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRemembered(!isRemembered)}> */}
          {/* <View
            style={[
              styles.checkbox,
              { backgroundColor: isRemembered ? '#2D4990' : 'white' },
            ]}
          />
        </TouchableOpacity> */}
        {/* <Text style={styles.rememberMe}>Remember me</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FirebaseForgotPassword');
          }}
        >
          {/* <Text style={styles.forgottenPassword}>Forgotten Password?</Text> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleAdminLogin()}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButtonScreen onPress={() => { navigation.navigate('User Sign in') }} />
          <Text style={{color:"black"}}>Back</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8594E5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  headingText: {
    fontSize: 44,
    textAlign: 'center',
    paddingBottom: 70,
    color: '#000',
    fontFamily: 'Jaldi',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 44,
  },
  subHeadingText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 20,
    marginLeft: 9,
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure the text takes the full width
    paddingHorizontal: 15, // Apply padding to match input fields
  },
  textInput: {
    width: 330,
    height: 44,
    borderRadius: 30,
    backgroundColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
  },
  rememberMe: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    marginRight: 55,
  },
  forgottenPassword: {
    color: '#2D4990',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  loginButton: {
    backgroundColor: '#2D4990',
    width: 180,
    height: 45,
    borderRadius: 31,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
  },
  orText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 55,
    borderRadius: 31,
    backgroundColor: '#FFF',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  googleButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
  },
  signUpText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 10,
    marginTop: 30,
  },
  signUpLink: {
    color: '#2D4990',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default FirebaseAdmin;
