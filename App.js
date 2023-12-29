import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  auth  from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


import AddProductScreen from './adminScreens/AddProductScreen';
import ViewAllProductsScreen from './adminScreens/ViewAllProductsScreen';
import UpdateProductScreen from './adminScreens/UpdateProductScreen';
import DeleteProductScreen from './adminScreens/DeleteProductScreen';
import ProductDetailScreen from './adminScreens/ProductDetailScreen';
import userProductDetailScreen from './adminScreens/UserProductDetailScreen';
import ViewCartScreen from './adminScreens/ViewCartScreen';
import ShippingAddressScreen from './adminScreens/ShippingAdderessScreen';
import UserSignInScreen from './adminScreens/UserSignInScreen'
import FirebaseSignUp from './adminScreens/UserSignUp'
import FirebaseAdmin from './adminScreens/AdminSignIn';
import FirebaseForgotPassword from './adminScreens/UserForgotPassword';
import FirebaseUpdateProfile from './adminScreens/UserUpdateProfile';
import AboutUsScreen from './adminScreens/AboutUs';
import { Text } from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const commonHeaderOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: 'lightgray' },
  headerTitleStyle: { color: 'black', fontSize: 30 },
  
};

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="AddProduct" options={{ headerShown: false }} component={AddProductScreen} />
//   </Stack.Navigator>
// );

// const ProductsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="ViewAllProducts" options={{ headerShown: false }} component={ViewAllProductsScreen} />
//   </Stack.Navigator>
// );



const AdminDrawer = () => (

  
  <Drawer.Navigator initialRouteName='View All Products'>
          <Drawer.Screen name="Products" options={commonHeaderOptions} component={ViewAllProductsScreen} />
          <Drawer.Screen name="AddProduct" options={{ headerShown: false, tabBarVisible: false  }} component={AddProductScreen} />
          <Drawer.Screen name="PRODUCTS" options={{drawerLabel:'',headerShown:false}} component={ProductDetailScreen} />
          <Drawer.Screen name="UpdateProduct" options={{ drawerLabel:'' , headerShown: false }} component={UpdateProductScreen} />



  </Drawer.Navigator>
);

const DeleteProductStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="Delete Product" options={{ title: false }} component={DeleteProductScreen} /> */}
    <Stack.Screen name="User Signup" component={FirebaseSignUp} />


  </Stack.Navigator>
);

const DrawerM = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsUserSignedIn(!!user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const HandleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out successfully!');
        Alert.alert('User signed out successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Drawer.Navigator initialRouteName="E-Store" >
      {/* <Drawer.Screen name="Add Product" options={{ headerShown: false }} component={HomeStack} /> */}
      <Drawer.Screen name="User Sign in" options={{headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#4169E1' },
  headerTitleStyle: { color: 'black', fontSize: 30 },}} component={UserSignInScreen} />
      <Drawer.Screen name="View Cart" options={{headerShown:false}} component={ViewCartScreen} />
      <Stack.Screen name="E-Store" options={commonHeaderOptions} component={DeleteProductScreen} />
      {isUserSignedIn && (
  <Drawer.Screen
    name="Logout"
    options={{
      headerShown: false,
      drawerLabel: 'Logout'
    }}
    component={HandleLogout}
  />
)}
      <Drawer.Screen name="User Product Detail Screen" options={{drawerLabel:'',headerShown:false}} component={userProductDetailScreen} />
      <Drawer.Screen name="Placing Order" options={{ drawerLabel:'',headerShown: false }} component={ShippingAddressScreen} />
      <Stack.Screen name="Admin Sign in" options={{drawerLabel:'' , headerShown:false}} component={FirebaseAdmin} />
      <Stack.Screen name="Forgot Password" options={{ drawerLabel:'',headerShown: false }} component={FirebaseForgotPassword} />
      <Stack.Screen name="Update Profile " options={{drawerLabel:'', headerShown: false }} component={FirebaseUpdateProfile} />
      <Stack.Screen name="User Signup" options={{ drawerLabel:'',headerShown: false }} component={FirebaseSignUp} />
      {/* <Stack.Screen name="About Us" options={{ headerShown: false }} component={AboutUsScreen} /> */}

      {/* <Stack.Screen name="View All Products" options={{ headerShown: false }} component={ViewAllProductsScreen} /> */}
    <Stack.Screen name="View All Products" options={{drawerLabel:'', headerShown: false, tabBarVisible: false  }}  component={AdminDrawer} />

      
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./home1.png') : require('./home1.png')}
              style={{ width: 24, height: 24 }}
            />
          ), headerShown: false }} component={DrawerM} />
        <Tab.Screen name="Cart" options={{ tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./cart.png') : require('./cart.png')}
              style={{ width: 24, height: 24 }}
            />
          ), headerShown: false }} component={ViewCartScreen} />
        <Tab.Screen name="Profile" options={{ tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./userProfile.png') : require('./userProfile.png')}
              style={{ width: 24, height: 24 }}
            />
          ), headerShown: false }} component={FirebaseUpdateProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
