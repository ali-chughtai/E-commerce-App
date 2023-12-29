// FirebaseLogin.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import BackButtonScreen from './BackButton';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '208471355869-tpcbob9mkp7nc5v22c6qpvh1dgsvgdp3.apps.googleusercontent.com',
// });


const FirebaseLogin = ({navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setRemembered] = useState(false);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in successfully!');
        Alert.alert('User signed in successfully!');
        navigation.navigate('E-Store');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('User not found!');
          Alert.alert('User not found!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Wrong password!');
          Alert.alert('Wrong password!');
        }

        console.error(error);
      });
  };

 async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

  const openAdminLogin = () => {
    // Navigate to FirebaseAdmin.js
    navigation.navigate('Admin Sign in');
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.adminLoginButton} onPress={openAdminLogin}>
      
        <Text style={styles.adminLoginButtonText}>Admin Login</Text>

      </TouchableOpacity>

      <Text style={styles.headingText}>Welcome Back!</Text>
      <Text style={styles.subHeadingText}>Login to your account</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Enter your password"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRemembered(!isRemembered)}
        >
          <View
            style={[styles.checkbox, { backgroundColor: isRemembered ? '#2D4990' : 'white' }]}
          />
        </TouchableOpacity>
        <Text style={styles.rememberMe}>Remember me</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Forgot Password');
          }}
        >
          <Text style={styles.forgottenPassword}>Forgotten Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      >
        <Image
          source={require('../google.jpeg')}
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>
          Login with your Google Account
        </Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text
          style={styles.signUpLink}
          onPress={() => {
            navigation.navigate('User Signup');
          }}
        >
          Sign Up
        </Text>
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButtonScreen onPress={() => { navigation.navigate('E-Store') }} />
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
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 15,
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
  adminLoginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent', // Make the button transparent
  },
  adminLoginButtonText: {
    color: '#FFF', // Adjust the text color as needed
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FirebaseLogin;
