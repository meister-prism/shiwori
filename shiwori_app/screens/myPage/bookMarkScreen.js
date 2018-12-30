import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BookMarkScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>BookMark Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
export default BookMarkScreen;