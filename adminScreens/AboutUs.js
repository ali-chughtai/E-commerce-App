import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

const AboutUsScreen = () => {
  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/+923404746647');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/your_instagram_profile/');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/your_facebook_page/');
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/your_twitter_profile/');
  };


  return (
    <View style={styles.container}>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.description}>
          Welcome to Our Store! Here you will not find what you want , but what you need.
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.longParagraph}>Incase of any Queries/Complain text us on whatsapp or , please let us know on one of the below platforms.</Text>
      </ScrollView>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={openWhatsApp}>
          <Image source={require('../whatsapp.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={openInstagram}>
          <Image source={require('../instagram.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={openFacebook}>
          <Image source={require('../facebook.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={openTwitter}>
          <Image source={require('../twitter.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8594E5',
  },
  aboutUsContainer: {
    padding: 20,
    backgroundColor: '#5F77F7',
    zIndex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D4990',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    lineHeight: 24,
  },
  scrollContainer: {
    flex: 1,
    margin: 20,
    padding: 20,
  },
  longParagraph: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2D4990',
    paddingVertical: 10,
    marginBottom:21
  },
  imageButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconImage: {
    width: 48,
    height: 48,
  },
});

export default AboutUsScreen;
