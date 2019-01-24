import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Login_null from '../../components/login/login_null';
import Login_guest from '../../components/login/login_guest';
import Login_registered from '../../components/login/login_registered';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import Startup from '../../components/welcome/startup';

export default class LoginScreen extends React.Component {
  _judge(){
    this.props.navigation.type = 'guest';
    switch(this.props.navigation.getParam('type')){
      case "registered":
      return <Login_registered navigation={this.props.navigation} state={this.state}/>
      case "guest":
        return <Login_guest navigation={this.props.navigation} state={this.state}/>
      case "null":
        return <Login_null navigation={this.props.navigation} state={this.state}/>
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Startup navigation={this.props.navigation} state={this.state}/>
        <Text>login screen</Text>
        {this._judge()}
        <Login_guest navigation={this.props.navigation} state={this.state}/>
        </View>
      </Provider>
    );
  }
}
