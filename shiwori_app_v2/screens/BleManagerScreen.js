import React, { Component } from 'react';
//import BleManager from 'react-native-ble-manager';
import {  StyleShee, TouchableHighlight, Text, View, Button, Alert } from 'react-native';

class BleManagerScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
      title: 'Ble setup'
    });
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
  }
  
  export default BleManagerScreen;