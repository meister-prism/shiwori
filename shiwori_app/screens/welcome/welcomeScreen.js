import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Startup from '../../components/welcome/startup';
import {Provider} from 'react-redux';
import {store} from '../../redux/store'; 

class WelcomeScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Startup navigation={this.props.navigation}/>
        </View>
      </Provider>
    );
  }
}

export default WelcomeScreen;