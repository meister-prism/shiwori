import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class MyPageScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button
          title="your book marks"
          onPress={() => this.props.navigation.navigate('BookMark')}
        />
      </View>
    );
  }
}
export default MyPageScreen;