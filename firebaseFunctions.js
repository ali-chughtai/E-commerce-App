import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const addProductToFirestore = async (product) => {
  const productsCollection = firestore().collection('products');

  await productsCollection.add(product);
};


export const updateProductInFirestore = async (updatedProduct) => {
  try {
    const { id, ...productData } = updatedProduct;

    await firestore().collection('products').doc(id).update(productData);

    Alert.alert('Product updated successfully');
    navigation.navigate('View All Products')

  } catch (error) {
    Alert.alert('Unforetunately, The product was not updated: ', error);
  }
};
