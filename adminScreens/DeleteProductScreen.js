import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';
import AboutUsScreen from './AboutUs'; // Import your AboutUsScreen component
import BackButtonScreen from './BackButton';


const DashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState('');
  const [sortByPrice, setSortByPrice] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsRef = firestore().collection('products');

        if (sortByPrice) {
          productsRef = productsRef.orderBy('price');
        }

        const productsSnapshot = await productsRef.get();

        if (productsSnapshot.empty) {
          console.log('No products found');
          return;
        }

        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortByPrice]);

  const handleSearch = () => {
    const searchTerm = tempProduct.toLowerCase();
  
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    }
  };
  const navigateToProductDetails = (product) => {
    navigation.navigate('User Product Detail Screen', { product });
  };

  return (
    <View style = {{flex:1}}>
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Help yourself out</Text>
      <View style={styles.searchContainer}>
        <Text style={[styles.searchIcon, { transform: [{ rotate: '320deg' }] }]}>⚲</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setTempProduct(text)}
          value={tempProduct}
          onSubmitEditing={handleSearch}
        />
        {/* Add a search button if needed */}
      </View>
      <View style={styles.sortButtonsContainer}>
        <TouchableOpacity
          style={[styles.sortButton, !sortByPrice && styles.activeSortButton]}
          onPress={() => setSortByPrice(false)}
        >
          <Text style={styles.sortButtonText}>All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortByPrice && styles.activeSortButton]}
          onPress={() => setSortByPrice(true)}
        >
          <Text style={styles.sortButtonText}>By Price</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productsContainer}>
        {filteredProducts.map((item, index) => (
          <View key={item.id} style={styles.productContainer}>
            {item.images && item.images.length > 0 ? (
              <Swiper style={styles.swiperContainer} showsButtons>
                {item.images.map((image, imageIndex) => (
                  <View key={imageIndex} style={styles.swiperSlide}>
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
        {filteredProducts.length === 0 && <Text style={{alignSelf:'center', fontSize:20}}>No matching products</Text>}
      </View>
      <AboutUsScreen />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
  heading: {
    fontSize: 34,
    marginBottom: 10,
    color:'black'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'darkgray',
    borderRadius:26
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    color:'black',
    fontSize:17
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'darkgray',
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
    borderRadius:20
  },
  activeSortButton: {
    backgroundColor: '#0000FF',
    color:'white'
  },
  sortButtonText: {
    fontWeight: 'bold',
    color:'white'
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  swiperContainer: {
    height: 150,
  },
  swiperSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  touchableOpacity: {
    padding: 10,
  },
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchIcon:{
    fontSize:30,
    marginLeft:20
  }
});

export default DashboardScreen;
