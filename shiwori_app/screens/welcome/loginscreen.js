import React from 'react';
import { Text, View, Button } from 'react-native';

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
        <Button
          title="ゲストとしてログイン"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default LoginScreen;