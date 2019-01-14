import React from 'react';
import {  Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="読書記録の編集"
          onPress={() => this.props.navigation.navigate('Edit')}
        />
      </View>
    );
  }
}

export default HomeScreen;
