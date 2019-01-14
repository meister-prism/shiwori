import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class TutorialScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Tutorial Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
export default TutorialScreen;