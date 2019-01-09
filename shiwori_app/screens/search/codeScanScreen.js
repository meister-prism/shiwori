import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker';

class CodeScanScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Barcode Screen</Text>
        <ReduxChecker />
      </View>
      </Provider>
    );
  }
}
export default CodeScanScreen;