import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import BackButtonScreen from './BackButton';

const ProductDetailScreen = ({ navigation,route }) => {
  const { product } = route.params;
  const [counter, setCounter] = useState(0)
    const confirmDelete = (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(productId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (productId) => {
    try {
      await firestore().collection('products').doc(productId).delete();
      // Update the products state after deletion
    //   setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      Alert.alert('Product deleted successfully');
      setCounter(1);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  return (
    
    <ScrollView style={[styles.container, { backgroundColor: 'lightgray' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:7 }}>
          <BackButtonScreen onPress={() => { navigation.navigate('Products') }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Back</Text>
        </View>
        <View style={{marginBottom:20}}><Text style={{color:'black', fontSize:27, fontWeight:'bold', textAlign:'center'}}>Product Specifications</Text></View>

    {counter !== 1 ? (
        <View>
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
        <Text style={styles.price}>{product.description} </Text>
        <Text style={styles.price}>Total in Stock: {product.stock} items</Text>

      </View>
      <View style={{flexDirection:'row'}}><TouchableOpacity
            style={[styles.deleteButton,{marginLeft:10}]}
            onPress={() => confirmDelete(product.id)}
          >
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
          
      <TouchableOpacity
            style={[styles.deleteButton,{marginLeft:13}]} onPress={()=>{navigation.navigate("UpdateProduct", {product})}}
          >
            <Text style={styles.deleteButtonText}>Update</Text>
          </TouchableOpacity></View>
          </View>):(<Text>Nothing to display</Text>)}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray', // Light gray background color
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
        marginLeft:20,
      },
      price:{
        color:"gray",
        fontSize:16,
        fontWeight:"bold",
        marginLeft:20,
        marginBottom:20
      },
      deleteButton: {
        // position: 'absolute',
        width:'48%',
        bottom: 10,
        right: 10,
        backgroundColor: 'black',
        padding: 12,
        // paddingTop:10,
        borderRadius: 10,
        marginBottom:20
      },
      deleteButtonText: {
        color: 'white',
        fontSize:20,
        fontWeight: 'bold',
        alignSelf:'center',
      },
});

export default ProductDetailScreen;
