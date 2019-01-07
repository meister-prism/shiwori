import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class KeywordScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Keyword Screen</Text>
        <Button
          title="seach"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
    );
  }
}
export default KeywordScreen;