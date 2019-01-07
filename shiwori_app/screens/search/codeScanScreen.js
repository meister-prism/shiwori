import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class CodeScanScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Barcode Screen</Text>
        <Button
          title="scancode"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
    );
  }
}
export default CodeScanScreen;