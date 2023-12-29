import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';


const ViewAllProductsScreen = ({ navigation,route }) => {
    const [products, setProducts] = useState([]);
    const [tempProduct, setTempProduct] = useState();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsSnapshot = await firestore().collection('products').get();
  
          if (productsSnapshot.empty) {
            console.log('No products found');
            return;
          }
  
          const productsData = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);

    navigateToProductDetails = (product) => {
      console.log('Navigating to Product Details:', product);
      navigation.navigate('PRODUCTS', { product });
        }
  
    
  
    return (
      <ScrollView style={[styles.container, { backgroundColor: 'lightgray' }]}>
        <View style={{marginBottom:20}}>
          <TouchableOpacity onPress={()=>{navigation.navigate("Admin Sign in")}}>
            <Text style={{alignSelf:"flex-end" , color:"black", fontSize:18, fontWeight:'bold'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        {products.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            {item.images && item.images.length > 0 ? (
              <Swiper style={styles.swiperContainer} showsButtons>
                {item.images.map((image, index) => (
                  <View key={index} style={styles.swiperSlide}>
                    <Image source={{ uri: image }} style={styles.productImage} />
                  </View>
                ))}
              </Swiper>
            ) : (
              <Text>No images available</Text>
            )}
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => navigateToProductDetails(item)}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Pkr {item.price} Rs/-</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {products.length === 0 && <Text>No products available</Text>}
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
      height: 250, // Adjust the height as needed,
    },
    swiperSlide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImage: {
      width: 260,
      height: 197,
      borderRadius: 10,
    },
    touchableOpacity: {
      padding: 20,
    },
    name: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    price: {
      color: 'gray',
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'black',
      padding: 5,
      borderRadius: 5,
      marginBottom: 20,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    
  });
  
  export default ViewAllProductsScreen;
  