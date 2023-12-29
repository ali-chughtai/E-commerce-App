import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { updateProductInFirestore } from '../firebaseFunctions';
import firestore from '@react-native-firebase/firestore';
import BackButtonScreen from './BackButton';

const UpdateProductScreen = ({ navigation,route }) => {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [images, setImages] = useState(product.images || []);
  const [stock, setStock] = useState(product.stock.toString());


  const updateProductInFirestore = async (updatedProduct) => {
    try {
      const { id, ...productData } = updatedProduct;
  
      await firestore().collection('products').doc(id).update(productData);
  
      Alert.alert('Product updated successfully');
      navigation.navigate('Products')
  
    } catch (error) {
      Alert.alert('Unforetunately, The product was not updated: ', error);
    }
  };
  

  const handleUpdate = () => {
    // Perform the update operation here
    const updatedProduct = {
      id: product.id,
      name,
      description,
      price: parseFloat(price),
      images,
      stock: parseInt(stock),
      // Add other fields as needed
    };

    // Call your function to update the product in Firestore
    updateProductInFirestore(updatedProduct);
  };

  const handleImagePicker = async () => {
    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
      });
      setImages(selectedImages.map((image) => image.path));
    } catch (error) {
      console.error('Error selecting images:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:7 }}>
          <BackButtonScreen onPress={() => { navigation.navigate('PRODUCTS',{product}) }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Back</Text>
        </View>
      
      <Text style={styles.heading}>Update Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={(text) => setStock(text)}
        keyboardType="numeric"
      />
      {/* Add other input fields as needed for images, stock, etc. */}
      <Button title="Select Images" onPress={handleImagePicker} />
      <View style={{marginBottom:12}}></View>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
        ))}
      </View>
      
      <Button title="Update" onPress={handleUpdate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'lightgray'
  },
  heading: {
    fontSize: 26,
    color:'black',
    marginBottom: 14,
    alignSelf:'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor:'darkgray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: 80,
    height: 80,
    margin: 5,
  },
});

export default UpdateProductScreen;
