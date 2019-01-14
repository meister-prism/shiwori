import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class HelpScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Help Screen</Text>
        <Button
          title="tutorial"
          onPress={() => this.props.navigation.navigate('Tutorial')}
        />
      </View>
    );
  }
}
export default HelpScreen;