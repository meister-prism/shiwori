import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import { Provider } from 'react-redux';
import { store,persistor } from '../../redux/store';
import RecordRegister_child from './recordRegisterScreen_child';
/**
 * bookDetaild.js >>here
 * here >> recordScreen_child.js
 */
class RecordRegisterScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '感想の登録',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });
  render() {
    let bookdata = this.props.navigation.getParam('bookdata')
    return (
      <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <RecordRegister_child bookdata={bookdata} navigation={this.props.navigation}/>
      </View>
      </Provider>
    );
  }
}
export default RecordRegisterScreen;