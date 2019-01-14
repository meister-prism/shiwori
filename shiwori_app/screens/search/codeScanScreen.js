import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import ReduxChecker from '../../components/debug/reduxchecker_userdata';

class CodeScanScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'バーコードスキャン',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Barcode Screen</Text>
        <Button
          title="scancode"
          onPress={() => this.props.navigation.navigate('Books')}
        />
        <ReduxChecker />
      </View>
      </Provider>
    );
  }
}
export default CodeScanScreen;