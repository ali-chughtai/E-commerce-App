import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButtonScreen from './BackButton';
import firestore from '@react-native-firebase/firestore';

const ShippingAddressScreen = ({ route, navigation }) => {
  const { totalPrice } = route.params;
  const shippingCost = 500;
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [emptyCounter, setEmptyCounter] = useState(0);

  const handleConfirmOrder = async () => {
    if (!name || !address || !city || !postalCode || !contactNo) {
      Alert.alert('Incomplete Information', 'Please fill in all fields.');
      return;
    }
  
    // Prepare order data
    const orderData = {
      name,
      address,
      city,
      postalCode,
      contactNo,
      totalPrice: totalPrice + shippingCost,
      cartItems,
      orderDate: new Date(),
    };
  
    // Show confirmation alert with "Confirm" and "Cancel" buttons
    Alert.alert(
      'Confirm Order',
      `Total Payment: Pkr ${totalPrice + shippingCost} Rs/-
      \n\nShipping Details:
      \nName: ${name}
      \nAddress: ${address}
      \nCity: ${city}
      \nPostal Code: ${postalCode}
      \nContact No: ${contactNo}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              // Add the order to the "orders" collection in Firestore
              await firestore().collection('orders').add(orderData);
  
              // Show success alert
              Alert.alert(
                'Order Placed Successfully',
                String.raw`Total Payment: Pkr ${totalPrice + shippingCost} Rs/-
                Shipping Details:
                Name: ${name}
                Address: ${address}
                City: ${city}
                Postal Code: ${postalCode}
                Contact No: ${contactNo}
                  
                Parcel will be shipped within 3 working days. Visit again soon!`
              );
  
              // Clear cart and set fields to default
              await AsyncStorage.removeItem('cart');
              setCartItems([]);
              setName('');
              setAddress('');
              setCity('');
              setContactNo('');
              setPostalCode('');
              setEmptyCounter(1);
              navigation.navigate("E-Store");
            } catch (error) {
              console.error('Error placing order:', error);
              Alert.alert('Error', 'There was an error placing the order. Please try again.');
            }
          },
        },
      ]
    );
  };
  

  // const handleConfirmOrder = async () => {
  //   if (!name || !address || !city || !postalCode || !contactNo) {
  //     Alert.alert('Incomplete Information', 'Please fill in all fields.');
  //     return;
  //   }
  
  //   // Prepare order data
  //   const orderData = {
  //     name,
  //     address,
  //     city,
  //     postalCode,
  //     contactNo,
  //     totalPrice: totalPrice + shippingCost,
  //     cartItems,
  //     orderDate: new Date(), // Include order date if needed
  //   };
  
  //   try {
  //     // Add the order to the "orders" collection in Firestore
  //     await firestore().collection('orders').add(orderData);
  
  //     // Display confirmation alert with details
  //     Alert.alert(
  //       'Order Placed Successfully',
  //       String.raw`Total Payment: Pkr ${totalPrice + shippingCost} Rs/-
  // Shipping Details:
  // Name: ${name}
  // Address: ${address}
  // City: ${city}
  // Postal Code: ${postalCode}
  // Contact No: ${contactNo}
        
  // Parcel will be shipped within 3 working days. Visit again soon!`
  //     );
  
  //     // Clear cart and set fields to default
  //     await AsyncStorage.removeItem('cart');
  //     setCartItems([]);
  //     setName('');
  //     setAddress('');
  //     setCity('');
  //     setContactNo('');
  //     setPostalCode('');
  //     setEmptyCounter(1);
  //     navigation.navigate("E-Store");
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     Alert.alert('Error', 'There was an error placing the order. Please try again.');
  //   }
  // };

  

  useEffect(() => {
    // Retrieve cart data from AsyncStorage when the component mounts
    const getCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCartItems = JSON.parse(cartData);
          setCartItems(parsedCartItems);
        }
      } catch (error) {
        console.error('Error retrieving cart data:', error);
      }
    };

    getCartData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <BackButtonScreen onPress={() => { navigation.navigate('View Cart') }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Cart</Text>
        </View>
      </View>
      <Text style={styles.heading}>Shipping Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact no"
        value={contactNo}
        onChangeText={setContactNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      {emptyCounter !== 1 ? (

        <View style={styles.orderSummary}>
          <Text style={styles.totalText}>Cash On Delivery: Pkr {totalPrice + shippingCost} Rs/-</Text>
          <Text style={{ color: 'black', fontSize: 20, marginBottom: 10 }}>Order Summary</Text>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              {item.images && item.images.length > 0 && (
                <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
              )}
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>Pkr {item.price} Rs/-</Text>
                <Text style={styles.cartItemQuantity}>x {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (<Text>Nothing to display</Text>)}


      <TouchableOpacity style={styles.confirmOrderButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  confirmOrderButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmOrderButtonText: {
    color: 'white',
    fontSize: 18,
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
});

export default ShippingAddressScreen;
