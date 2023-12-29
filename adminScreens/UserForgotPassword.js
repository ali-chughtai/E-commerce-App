// FirebaseForgotPassword.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const FirebaseForgotPassword = ({navigation,route}) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password reset email sent successfully!');
        navigation.navigate('User Sign in');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error sending password reset email. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Forgot Password</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <Text style={{ color: 'white' }}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('User Sign in');
        }}
      >
        <Text style={{ color: 'blue', marginTop: 20 }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8594E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 15,
  },
  textInput: {
    width: '80%',
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 20,
    borderRadius: 100,
  },
  resetButton: {
    backgroundColor: '#2D4990',
    width: 130,
    height: 45,
    borderRadius: 100,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FirebaseForgotPassword;
