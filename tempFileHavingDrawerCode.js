import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabScreen({ navigation }) {
  const name = "Ali";
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeTab Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('DetailsTab', { name });
        }}
      />
    </View>
  );
}



function DetailsScreen({ route, navigation }) {
  const name = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', { name })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeTab')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ThirdScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Third Screen</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTabScreen} />
      <Tab.Screen name="DetailsTab" component={DetailsScreen} />
      <Tab.Screen name="ThirdScreenTab" component={ThirdScreen} />

    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeTab">
        <Drawer.Screen name="HomeTab" component={TabNavigator} />
        <Drawer.Screen name="ThirdScreen" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
