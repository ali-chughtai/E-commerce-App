// FirebaseSignUp.js

import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native';

const FirebaseSignUp = ({navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleSignUp = () => {
    if (!isChecked) {
      Alert.alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    // Additional validation or checks can be added as needed

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        Alert.alert('User Account is created successfully');
        navigation.navigate('E-Store');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={myStyle.mainView}>
      <Text style={myStyle.headingText}>Sign Up</Text>

      <TextInput
        style={myStyle.textInput}
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={myStyle.textInput}
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={myStyle.textInput}
        placeholder="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={myStyle.textInput}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={myStyle.textInput}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />

      <TouchableOpacity
        style={myStyle.checkboxContainer}
        onPress={() => setChecked(!isChecked)}
      >
        <View
          style={[
            myStyle.checkbox,
            { backgroundColor: isChecked ? '#2D4990' : 'white' },
          ]}
        />
        <Text style={myStyle.checkboxText}>
          I agree to the Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={myStyle.signupButton} onPress={() => handleSignUp()}>
        <Text style={{ color: 'white' }}>Sign Up!</Text>
      </TouchableOpacity>

      <Text
        onPress={() => {
          navigation.navigate('User Sign in');
        }}
        style={{ color: 'blue', fontSize: 15 }}
      >
        Already have an Account? Login
      </Text>
    </View>
  );
};

const myStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#8594E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 55,
    textAlign: 'center',
    paddingBottom: 45,
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure the text takes the full width
    paddingHorizontal: 15, // Apply padding to match input fields
    marginLeft:45,
  },
  textInput: {
    width: '80%',
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 100,
  },
  signupButton: {
    backgroundColor: '#2D4990',
    width: 110,
    height: 45,
    borderRadius: 100,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 12,
    color: 'black',
  },
});

export default FirebaseSignUp;
