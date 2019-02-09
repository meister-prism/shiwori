import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import Key_Child from './keywordsScreen_child';
import { store,persistor } from '../../redux/store';
import { Provider } from 'react-redux';


class KeywordScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'キーワード検索',
    headerLeft: <HeaderIcon navigation={navigation}/>,
  });

  render() {
    return (
      <Provider  store={store}>
        <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
          <Key_Child navigation={this.props.navigation}/>
        </View>
      </Provider>
    );
  }
}

export default KeywordScreen;

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    width:200,
    borderWidth: 1,
    borderColor: '#333'
  }
});
