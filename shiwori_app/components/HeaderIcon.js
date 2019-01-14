import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const HeaderIcon = (props) => {
  return (
    <View style={{ left: 10 ,flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Image 
          source={require('../assets/icons/hamburger-icon.png')} 
          style={{ width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  ); 
}
export default HeaderIcon