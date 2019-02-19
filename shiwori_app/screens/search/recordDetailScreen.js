import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import RecordRegister_child from './recordRegisterScreen_child';
/**
 * >>here
 * here >> recordScreen_child.js
 */
class RecordRegisterScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'レビュー詳細画面',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>record詳細</Text>
      </View>
    );
  }
}
export default RecordRegisterScreen;