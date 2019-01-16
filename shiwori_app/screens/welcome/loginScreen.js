import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Login_null from '../../components/login/login_null';
import Login_guest from '../../components/login/login_guest';
import Login_registered from '../../components/login/login_registered';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';

export default class LoginScreen extends React.Component {
  _judge(){
    switch(this.props.navigation.getParam('type')){
      case "registered":
      return <Login_registered navigation={this.props.navigation}/>
      case "guest":
        return <Login_guest navigation={this.props.navigation}/>
      case "null":
        return <Login_null navigation={this.props.navigation}/>
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {this._judge()}
        </View>
      </Provider>
    );
  }
}
