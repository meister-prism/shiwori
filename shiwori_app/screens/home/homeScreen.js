import React from 'react';
import {  StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_bookdata';


class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <Provider  store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="読書記録の編集"
          onPress={() => this.props.navigation.navigate('Edit')}
        />
        <ReduxChecker />
      </View>
      </Provider>
    );
  }
}

export default HomeScreen;
