import React, {Component} from 'react';
import {  StyleSheet,Modal,  TouchableHighlight,Text, View, Button, Alert } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_bookdata';
import WelcomeScreen from '../welcome/welcomeScreen';
import Startup from '../../components/welcome/startup';
import BleExample from "../../components/BleExample";

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });

  startScan(){
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning: true});
        console.log(results)
      });
    }
  
    BleManager.getConnectedPeripherals([]).then((results) => {
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        console.log(peripheral)
        this.setState({ peripherals });
      }
    });
  
    BleManager.connect("54:9F:13:C1:3C3E:EA").then(() => {
      console.log('Connected');
    }).catch((error) => {
      // Failure code
      console.log(error);
    })
  
    BleManager.retrieveServices("54:9F:13:C1:3C3E:EA").then((peripheralInfo) => {
      // Success code
      console.log('Peripheral info:', peripheralInfo);
    });
  
    const data = stringToBytes("piyo");
    console.log(data)
    BleManager.write("54:9F:13:C1:3C3E:EA", "09fc95c0-c111-11e3-9904-0002a5d5c51b", "16fe0d80-c111-11e3-b8c8-0002a5d5c51b", data).then(() => {
      // Success code
      console.log('Write: ' + data);
    }).catch((error) => {
      // Failure code
      console.log(error);
    });
  }
  render() {
    return (
      <Provider  store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>Home Screen</Text>
        <Button
          title="読書記録の編集"
          onPress={() => this.props.navigation.navigate('Edit')}
        />
        <ReduxChecker /> */}
        <BleExample/>
      </View>
      </Provider>
    );
  }
}

export default HomeScreen;
