import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_userdata';
class SearchScreen extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Screen</Text>
        <Button
          title="Search on Keywords"
          onPress={() => this.props.navigation.navigate('Keyword')}
        />
        <Button
          title="Search on Category"
          onPress={() => this.props.navigation.navigate('CodeScan')}
        />
        <Button
          title="Search on Category"
          onPress={() => this.props.navigation.navigate('Category')}
        />

        <Text>Recommended</Text>
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
export default SearchScreen;