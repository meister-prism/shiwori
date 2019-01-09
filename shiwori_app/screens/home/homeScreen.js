import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import ReduxChecker from '../../components/reduxchecker';

class HomeScreen extends React.Component {
  render() {
    return (
      <Provider  store={store}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ReduxChecker />
        </View>
      </Provider>
    );
  }
}

export default HomeScreen;