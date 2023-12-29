import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButtonScreen from './BackButton';

const ViewCartScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCost = 500;

  useEffect(() => {
    // Retrieve cart data from AsyncStorage when the component mounts
    const getCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCartItems = JSON.parse(cartData);
          setCartItems(parsedCartItems);
          calculateTotalPrice(parsedCartItems);
        }
      } catch (error) {
        console.error('Error retrieving cart data:', error);
      }
    };

    getCartData();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const removeItem = async (index) => {
    try {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButtonScreen onPress={() => { navigation.navigate('E-Store') }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Home</Text>
        </View>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearCart}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom:20}}><Text style={{color:'black', fontSize:27, fontWeight:'bold', textAlign:'center'}}>My Cart</Text></View>

      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItemContainer}>
            {item.images && item.images.length > 0 && (
              <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
            )}
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>Pkr {item.price} Rs/-</Text>
              <Text style={styles.cartItemQuantity}>x {item.quantity}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                <Text style={styles.removeButtonText}>x</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={{fontSize:20, alignSelf:'center', color:'black'}}>Unforetunately the cart is empty :(</Text>
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalTitle}>Total:</Text>
            <Text style={styles.totalText}>Pkr {totalPrice} Rs/-</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalTitle}>Shipping:</Text>
            <Text style={styles.totalText}>Pkr {shippingCost} Rs/-</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.totalRow}>
            <Text style={styles.grandTotalTitle}>Grand Total:</Text>
            <Text style={styles.grandTotalText}>Pkr {totalPrice + shippingCost} Rs/-</Text>
          </View>
        </View>
      )}

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Placing Order", { totalPrice, shippingCost })}>
          <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  clearCart: {
    color: 'blue',
    fontWeight: 'bold',
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  cartItemImage: {
    width: 80,
    height: 60,
    borderRadius: 5,
  },
  cartItemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  removeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalContainer: {
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'right',
  },
  grandTotalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  grandTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
  line: {
    height: 2,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default ViewCartScreen;
