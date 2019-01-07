import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class CategoryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Category Screen</Text>
        <Button
          title="ct1"
          onPress={() => this.props.navigation.navigate('Books')}
        />
        <Button
          title="ct2"
          onPress={() => this.props.navigation.navigate('Books')}
        />
      </View>
    );
  }
}

export default CategoryScreen;