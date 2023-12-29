// FirebaseUpdateProfile.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const IconHome = require('../homeicon.png'); 
const IconMenu = require('../barsicon.png'); 
const IconCart = require('../carticon.png'); 
const IconProfile = require('../profileicon.png'); 

const FirebaseUpdateProfile = ({ navigation,route }) => {
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [pressedSection, setPressedSection] = useState(null);

  const handleProfilePress = () => {
    setShowUploadOption(!showUploadOption);
  };

  return (
    <View style={styles.container}>
      {/* Update Profile Heading */}
      <View style={styles.updateProfileContainer}>
        <Text style={styles.heading}>Update Profile</Text>
      </View>

      {/* Default Profile Picture */}
      <View style={styles.defaultProfileContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require('../defaultprofile.png')} 
            style={styles.defaultProfile}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.profilePictureSection}>
        {/* Logic to show profile picture or upload option */}
        {showUploadOption && (
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Picture</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section with Lines and Text */}
      <View style={styles.textSectionContainer}>
        <TouchableOpacity
          style={[styles.section, pressedSection === 'Personal Info' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Personal Info press
            console.log('Personal Info pressed');
            setPressedSection('Personal Info');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Personal Info' && { color: 'white' }]}>Personal Info</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={[styles.section, pressedSection === 'Account Info' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Account Info press
            console.log('Account Info pressed');
            setPressedSection('Account Info');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Account Info' && { color: 'white' }]}>Account Info</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={[styles.section, pressedSection === 'Address Info' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Address Info press
            console.log('Address Info pressed');
            setPressedSection('Address Info');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Address Info' && { color: 'white' }]}>Address Info</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={[styles.section, pressedSection === 'Change Password' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Change Password press
            console.log('Change Password pressed');
            setPressedSection('Change Password');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Change Password' && { color: 'white' }]}>Change Password</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={[styles.section, pressedSection === 'Change Email' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Change Email press
            console.log('Change Email pressed');
            setPressedSection('Change Email');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Change Email' && { color: 'white' }]}>Change Email</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={[styles.section, pressedSection === 'Update Order' && { backgroundColor: '#AC7373' }]}
          onPress={() => {
            // Handle Update Order press
            console.log('Update Order pressed');
            setPressedSection('Update Order');
          }}
        >
          <Text style={[styles.sectionText, pressedSection === 'Update Order' && { color: 'white' }]}>Update Order</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>

      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  updateProfileContainer: {
    width: '100%',
    backgroundColor: '#5F77F7',
    padding: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
  },
  defaultProfileContainer: {
    width: '100%',
    backgroundColor: '#7487E6',
    paddingBottom: 30,
    paddingTop: 30,
  },
  defaultProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  profilePictureSection: {
    width: '100%',
    marginBottom: 20,
    padding: 5,
  },
  uploadButton: {
    backgroundColor: '#AC7373',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
  },
  textSectionContainer: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: 20,
    padding: 10,
    color:'gray'
  },
  arrow: {
    fontSize: 16,
    color: '#AC7373',
  },
  line: {
    width: '96%',
    height: 1,
    backgroundColor: '#AC7373',
    alignSelf: 'center',
  },
  bottomIconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FirebaseUpdateProfile;
