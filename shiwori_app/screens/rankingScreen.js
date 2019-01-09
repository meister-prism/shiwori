import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ReduxChecker from '../components/debug/reduxchecker';
import { Provider } from 'react-redux';
import { store,persistor } from '../redux/store';

class RankingScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Ranking Screen</Text>
        <Button
          title="book1"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
        <Button
          title="book2"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
        <ReduxChecker />
      </View>
      </Provider>
    );
  }
}
export default RankingScreen;