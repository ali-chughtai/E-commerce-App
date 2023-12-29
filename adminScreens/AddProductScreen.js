import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { addProductToFirestore } from '../firebaseFunctions';
import BackButtonScreen from './BackButton';

const AddProductScreen = ({navigation,router}) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [images, setImages] = useState([]);

  const handleChooseImage = async () => {
    try {
      const response = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      if (response && response.length > 0) {
        const newImages = response.map((image) => ({ uri: image.path }));

        console.log('Selected Images:', newImages); // Add this line

        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error('ImagePicker error:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      console.log('Adding product...'); // Add this line

      if (!productName || !productPrice || !stockAmount || images.length === 0) {
        alert('Please fill in all fields and choose at least one image.');
        return;
      }

      const price = parseFloat(productPrice);
      const stock = parseInt(stockAmount);

      console.log('Product Details:', { name: productName, price, stock, images }); // Add this line

      await addProductToFirestore({
        name: productName,
        price,
        description: productDescription || '',
        stock,
        images: images.map((image) => image.uri),
      });

      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setStockAmount('');
      setImages([]);

      alert('Product added successfully!');
      navigation.navigate('Products')
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };


  return (
    <ScrollView style={[styles.container,{backgroundColor:'lightgray'}]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:7 }}>
          <BackButtonScreen onPress={() => { navigation.navigate('Products') }} />
          <Text style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Back</Text>
        </View>
      <View>
        <Text style={styles.heading}>Add Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Price"
          value={productPrice}
          onChangeText={(text) => setProductPrice(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Product Description"
          value={productDescription}
          onChangeText={(text) => setProductDescription(text)}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Stock Amount"
          value={stockAmount}
          onChangeText={(text) => setStockAmount(text)}
          keyboardType="numeric"
        /><View style={{marginBottom:12}}><Button  title="Choose Images" onPress={handleChooseImage} /></View>
        
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={styles.imagePreview} />
          ))}
        </View>
        <Button  title="Add Product" onPress={handleAddProduct} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf:'center',
    color:'black'
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

export default AddProductScreen;
