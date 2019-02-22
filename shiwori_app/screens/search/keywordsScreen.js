import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import Key_Child from './keywordsScreen_child';
import { store,persistor } from '../../redux/store';
import { Provider } from 'react-redux';

/**
 * serchScreen.js => here
 * here => keywordScreen_child.js
 */
class KeywordScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'キーワード検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
    headerStyle: {
      backgroundColor: '#FAE4EB',
      elevation: 0,
      shadowOpacity: 0
    },
  });

  render() {
    return (
      <Provider  store={store}>
        <View style={{ flex:1, alignItems: "center", justifyContent: "center", backgroundColor: '#fff' }}>
          <Key_Child navigation={this.props.navigation}/>
        </View>
      </Provider>
    );
  }
}

export default KeywordScreen;

const styles = StyleSheet.create({
});
