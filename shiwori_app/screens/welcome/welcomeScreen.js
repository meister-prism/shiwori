import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Welcome Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

export default WelcomeScreen;