import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButtonScreen from './BackButton';



const UserProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(Math.max(0, counter - 1));
  };

  const handleAddToCart = async () => {
    const existingCartItems = (await AsyncStorage.getItem('cart')) || '[]';
    const cartItems = JSON.parse(existingCartItems);
  
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += counter;
    } else {
      const newCartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: counter,
        images: product.images, // Array of image URLs
        // Add other product details as needed
      };
      
      cartItems.push(newCartItem);
    }
    if(counter!=0){
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    Alert.alert("Item added to cart successfully")
    setCounter(0);
    }
    else{
        Alert.alert("Minimum 1 product can be added to cart")
    }
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:7 }}>
          <BackButtonScreen onPress={() => { navigation.navigate('E-Store') }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Home</Text>
        </View>
        <View style={{marginBottom:20}}><Text style={{color:'black', fontSize:27, fontWeight:'bold', textAlign:'center'}}>Specifications</Text></View>

      </View>
      <View style={styles.productContainer}>
        {product.images && product.images.length > 0 ? (
          <Swiper style={styles.swiperContainer} showsButtons>
            {product.images.map((image, index) => (
              <View key={index} style={styles.swiperSlide}>
                <Image source={{ uri: image }} style={styles.productImage} />
              </View>
            ))}
          </Swiper>
        ) : (
          <Text>No images available</Text>
        )}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Pkr {product.price} Rs/-</Text>
        <Text style={{ fontSize: 19, color: 'black', marginLeft: 20, fontWeight: 'bold' }}>
          Specifications:
        </Text>
        <Text style={styles.price}>{product.description} </Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.counterButton} onPress={handleDecrement}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{counter}</Text>
          <TouchableOpacity style={styles.counterButton} onPress={handleIncrement}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.addToCartButton, { marginLeft: 10 }]}
          onPress={() => handleAddToCart()}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', // Light gray background color
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden', // Ensure that the overflow is hidden to properly handle TouchableOpacity
  },
  swiperContainer: {
    height: 350, // Adjust the height as needed,
  },
  swiperSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  price: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20,
  },
  counterButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
  },
  addToCartButton: {
    width: '94%',
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default UserProductDetailScreen;
