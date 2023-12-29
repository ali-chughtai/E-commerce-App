// BackButtonScreen component

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButtonScreen = ({ onPress }) => {
  const navigation = useNavigation();

  // Handle back press if onPress is not provided
  const handleBackPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <Image source={require('../left-arrow.png')} style={styles.iconImage} />
    </TouchableOpacity>
  );
};

const styles = {
  iconImage: {
    width: 20,
    height: 20,
  },
};

export default BackButtonScreen;
