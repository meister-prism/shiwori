import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Login_null from '../../components/login/login_null';
import Login_guest from '../../components/login/login_guest';
import Login_registered from '../../components/login/login_registered';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import Startup from '../../components/welcome/startup';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>login </Text>
          <Startup navigation={this.props.navigation} />
        </View>
      </Provider>
    );
  }
}
