import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker';

class CategoryScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Category Screen</Text>
        <Button
          title="ct1"
          onPress={() => this.props.navigation.navigate('Ranking')}
        />
        <Button
          title="ct2"
          onPress={() => this.props.navigation.navigate('Ranking')}
        />
      </View>
      <ReduxChecker />
      </Provider>
    );
  }
}

export default CategoryScreen;